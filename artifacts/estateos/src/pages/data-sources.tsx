import React, { useState, useEffect } from "react";
import { useListDataSources, getListDataSourcesQueryKey, useListIngestionEvents, getListIngestionEventsQueryKey, useTriggerIngestion } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, Activity, RefreshCw, AlertCircle, ArrowRight, Server, Globe, DownloadCloud, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function DataSources() {
  const { toast } = useToast();
  const { data: initialSources, isLoading: loadingSources } = useListDataSources({ query: { queryKey: getListDataSourcesQueryKey() } });
  const { data: initialEvents, isLoading: loadingEvents } = useListIngestionEvents({ query: { queryKey: getListIngestionEventsQueryKey() } });
  const triggerMutation = useTriggerIngestion();

  // Local state for simulating live events
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (initialEvents) setLiveEvents(initialEvents.slice(0, 10));
    if (initialSources) setSources(initialSources);
  }, [initialEvents, initialSources]);

  // Live simulation effect
  useEffect(() => {
    if (!isSimulating || !sources.length) return;

    const interval = setInterval(() => {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const types = ['sync.started', 'records.upserted', 'records.deleted', 'sync.completed'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      const newEvent = {
        id: `ev-${Date.now()}`,
        sourceId: source.id,
        sourceName: source.name,
        eventType: type,
        timestamp: new Date().toISOString(),
        recordsAffected: Math.floor(Math.random() * 50) + 1,
        status: 'success'
      };

      setLiveEvents(prev => [newEvent, ...prev].slice(0, 20));
      
      // Update source counters
      setSources(prev => prev.map(s => {
        if (s.id === source.id) {
          return {
            ...s,
            recordsIngested: s.recordsIngested + newEvent.recordsAffected,
            eventsToday: s.eventsToday + 1,
            lastSync: new Date().toISOString()
          };
        }
        return s;
      }));

    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating, sources]);

  const handleTrigger = () => {
    triggerMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: "Ingestion Triggered", description: "Manual sync job started across all live sources." });
      }
    });
  };

  const getSystemIcon = (system: string) => {
    if (system.includes('MRI')) return <Database className="h-5 w-5" />;
    if (system.includes('REA')) return <Globe className="h-5 w-5" />;
    if (system.includes('CRM')) return <Server className="h-5 w-5" />;
    return <DownloadCloud className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Ingestion Hub</h1>
          <p className="text-muted-foreground mt-1">Live data pipeline connecting external systems to EstateOS.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Pipeline Active
          </Badge>
          <Button onClick={handleTrigger} disabled={triggerMutation.isPending} className="bg-card hover:bg-accent border border-white/10">
            <RefreshCw className={`h-4 w-4 mr-2 ${triggerMutation.isPending ? 'animate-spin' : ''}`} />
            Trigger Manual Sync
          </Button>
        </div>
      </div>

      {loadingSources ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sources.map((source, i) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/50 border-white/5 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {getSystemIcon(source.system)}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    {source.isLive && (
                      <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    )}
                  </div>
                  <CardDescription className="text-xs">{source.system}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-[10px] bg-white/5">{source.integrationMode}</Badge>
                    <Badge variant="secondary" className="text-[10px] bg-white/5">{source.phase}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-white/5">
                    <div>
                      <p className="text-muted-foreground text-xs">Records</p>
                      <p className="font-mono text-primary font-bold">{source.recordsIngested.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Events Today</p>
                      <p className="font-mono">{source.eventsToday.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground flex items-center justify-between bg-black/20 p-2 rounded">
                    <span>Last Sync</span>
                    <span className="font-mono">{new Date(source.lastSync).toLocaleTimeString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Card className="bg-black/40 border-white/10 shadow-2xl overflow-hidden mt-8">
        <CardHeader className="border-b border-white/5 bg-card/30">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Global Event Stream
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-4 space-y-2 font-mono text-sm relative">
            <AnimatePresence>
              {liveEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className="flex items-center gap-4 py-2 border-b border-white/5 text-muted-foreground"
                >
                  <span className="text-primary/70 shrink-0 w-24">{new Date(event.timestamp).toLocaleTimeString([], {hour12: false, fractionalSecondDigits: 2})}</span>
                  <Badge variant="outline" className="shrink-0 w-32 justify-center bg-white/5 border-white/10">{event.sourceName}</Badge>
                  <span className={`shrink-0 w-36 ${
                    event.eventType.includes('error') ? 'text-destructive' : 
                    event.eventType.includes('completed') ? 'text-green-500' : 'text-white/80'
                  }`}>
                    {event.eventType}
                  </span>
                  <span className="flex-1 truncate">
                    {event.recordsAffected > 0 ? `Processed ${event.recordsAffected} records` : 'System event'}
                  </span>
                  {event.status === 'success' ? (
                    <div className="h-2 w-2 rounded-full bg-green-500/50" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
