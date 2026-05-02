import React, { useState } from "react";
import { useListMaintenanceTickets, getListMaintenanceTicketsQueryKey, useApproveMaintenanceAction } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Clock, Wrench, CheckCircle2, ChevronDown, Activity, DollarSign, MessageSquare } from "lucide-react";
import { AIBadge } from "@/components/ai-badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const getPriorityColor = (priority: string) => {
  switch(priority) {
    case 'P1': return 'bg-red-500/20 text-red-500 border-red-500/30';
    case 'P2': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
    case 'P3': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    default: return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
  }
};

export default function Maintenance() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useListMaintenanceTickets(
    {}, 
    { query: { queryKey: getListMaintenanceTicketsQueryKey({}) } }
  );

  const approveMutation = useApproveMaintenanceAction({
    mutation: {
      onSuccess: () => {
        toast({ title: "Action Approved", description: "The AI suggested action has been executed." });
        queryClient.invalidateQueries({ queryKey: getListMaintenanceTicketsQueryKey({}) });
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          AI Maintenance Triage
          <AIBadge size="md" tip="AI reads each report, classifies urgency (P1–P4), identifies root cause, and recommends a vetted vendor — all before a PM touches it." />
        </h1>
        <p className="text-muted-foreground mt-1">Review and approve AI-triaged maintenance requests.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {tickets?.map((ticket, i) => {
              const isExpanded = expandedId === ticket.id;
              const isP1 = ticket.priority === 'P1';

              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`bg-card/50 overflow-hidden transition-colors border-border/50 ${isP1 ? 'border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : ''}`}>
                    {isP1 && <div className="h-1 w-full bg-red-500 animate-pulse" />}
                    <div 
                      className="p-6 cursor-pointer hover:bg-muted/40 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : ticket.id)}
                    >
                      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${getPriorityColor(ticket.priority)}`}>
                            {isP1 ? <AlertTriangle className="h-6 w-6" /> : <Wrench className="h-6 w-6" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                              {ticket.aiTriaged && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1">
                                  <Activity className="h-3 w-3" /> AI Triaged
                                </Badge>
                              )}
                              <span className="text-sm text-muted-foreground">{new Date(ticket.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-lg font-semibold mt-1">{ticket.category} @ {ticket.propertyAddress}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{ticket.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {ticket.pendingApproval && (
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">Action Required</Badge>
                          )}
                          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-border/50"
                        >
                          <CardContent className="p-6 bg-muted/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Original Request</h4>
                                  <p className="text-sm bg-card p-4 rounded-md border border-border/50">{ticket.description}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-primary" /> AI Analysis
                                  </h4>
                                  <div className="bg-primary/5 p-4 rounded-md border border-primary/20 space-y-2">
                                    <p className="text-sm">Based on the description, this represents a potential water leak which requires immediate attention to prevent property damage.</p>
                                    <div className="flex justify-between items-center text-xs mt-4 pt-2 border-t border-primary/10">
                                      <span className="text-primary/70">Confidence Score: 96%</span>
                                      <span className="text-primary/70">Est. Cost: $250 - $450</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Suggested Vendors</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between bg-card p-3 rounded-md border border-border/50">
                                      <div>
                                        <div className="text-sm font-medium">QuickFix Plumbing</div>
                                        <div className="text-xs text-muted-foreground">Available today • Rating 4.8/5</div>
                                      </div>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Matched</Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                {ticket.pendingApproval && (
                                  <div className="bg-card p-4 rounded-md border border-border/50 space-y-4">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                      <MessageSquare className="h-4 w-4" /> AI Suggested Action
                                    </h4>
                                    <p className="text-sm text-muted-foreground">Dispatch work order to QuickFix Plumbing and notify tenant of afternoon arrival window.</p>
                                    <div className="flex gap-2 pt-2">
                                      <Button 
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                        onClick={() => approveMutation.mutate({ data: { action: 'approve' } })}
                                        disabled={approveMutation.isPending}
                                      >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Approve & Dispatch
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
