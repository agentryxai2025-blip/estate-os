import React, { useState } from "react";
import { useListAuditLog, getListAuditLogQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, History, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 4 }).format(value);

export default function Audit() {
  const [search, setSearch] = useState("");

  const { data: logs, isLoading } = useListAuditLog({}, { query: { queryKey: getListAuditLogQueryKey({}) } });

  const filteredLogs = logs?.filter(l => 
    l.taskLabel.toLowerCase().includes(search.toLowerCase()) ||
    l.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Audit Log</h1>
          <p className="text-muted-foreground mt-1">Immutable record of all AI operations.</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search tasks or users..." 
          className="pl-9 bg-card/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Card className="bg-card/50">
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map(i => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        </Card>
      ) : (
        <Card className="bg-card/50 overflow-hidden border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Timestamp</TableHead>
                <TableHead>Task / User</TableHead>
                <TableHead>Model / Provider</TableHead>
                <TableHead className="text-right">Tokens (In/Out)</TableHead>
                <TableHead className="text-right">Latency</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs?.map((log, i) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-border/30 hover:bg-muted/50 font-mono text-sm"
                >
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' })}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground font-sans">{log.taskLabel}</div>
                    <div className="text-xs text-muted-foreground font-sans">{log.userName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{log.model}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    <span className="text-blue-500">{log.inputTokens}</span> / <span className="text-green-600">{log.outputTokens}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={log.latencyMs > 2000 ? 'text-orange-500' : 'text-muted-foreground'}>{log.latencyMs}ms</span>
                  </TableCell>
                  <TableCell className="text-right text-primary">
                    {formatCurrency(log.costAud)}
                  </TableCell>
                  <TableCell className="text-right">
                    {log.status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 inline-block" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive inline-block" />
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
