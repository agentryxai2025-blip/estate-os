import React, { useState } from "react";
import { useListAiProviders, getListAiProvidersQueryKey, useListAiTaskAssignments, getListAiTaskAssignmentsQueryKey, useGetAiSpend, getGetAiSpendQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings2, Cpu, Shield, DollarSign, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 2 }).format(value);

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function AiConfig() {
  const [sensitiveMode, setSensitiveMode] = useState(true);

  const { data: providers, isLoading: loadingProviders } = useListAiProviders({ query: { queryKey: getListAiProvidersQueryKey() } });
  const { data: tasks, isLoading: loadingTasks } = useListAiTaskAssignments({ query: { queryKey: getListAiTaskAssignmentsQueryKey() } });
  const { data: spend, isLoading: loadingSpend } = useGetAiSpend({ query: { queryKey: getGetAiSpendQueryKey() } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Configuration</h1>
          <p className="text-muted-foreground mt-1">Manage models, routing, and usage limits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Active Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Avg Latency</TableHead>
                    <TableHead className="text-right">Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingProviders ? (
                    <TableRow><TableCell colSpan={5}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
                  ) : providers?.map((p) => (
                    <TableRow key={p.id} className="border-border/30">
                      <TableCell>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.vendor}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${p.status === 'healthy' ? 'bg-green-500' : 'bg-orange-500'}`} />
                          <span className="text-sm capitalize">{p.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.region}</TableCell>
                      <TableCell className="text-sm font-mono">{p.avgLatencyMs}ms</TableCell>
                      <TableCell className="text-right text-sm font-medium text-green-600">{p.successRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                Task Routing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead>Task</TableHead>
                    <TableHead>Primary Model</TableHead>
                    <TableHead>Fallback</TableHead>
                    <TableHead className="text-right">Cost/Call</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingTasks ? (
                    <TableRow><TableCell colSpan={4}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
                  ) : tasks?.map((t) => (
                    <TableRow key={t.id} className="border-border/30">
                      <TableCell>
                        <div className="font-medium">{t.taskLabel}</div>
                        {t.containsPii && (
                          <Badge variant="outline" className="mt-1 text-[10px] bg-red-500/10 text-red-500 border-red-500/20 px-1 py-0"><Shield className="h-3 w-3 mr-1"/> PII Data</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">{t.primaryModel}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">{t.primaryProvider}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs text-muted-foreground">{t.fallbackModel}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm font-mono">{formatCurrency(t.costPerCall)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Spend Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loadingSpend ? <Skeleton className="h-48" /> : spend && (
                <>
                  <div className="text-center">
                    <div className="text-4xl font-bold">{formatCurrency(spend.totalThisMonth)}</div>
                    <p className="text-sm text-muted-foreground mt-1">Total spend this month</p>
                    <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="bg-primary h-full" 
                        style={{ width: `${Math.min(100, (spend.totalThisMonth / spend.budget) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Budget: {formatCurrency(spend.budget)}</p>
                  </div>

                  <div className="h-[200px]">
                    <h4 className="text-sm font-medium mb-4 text-center">Daily Spend</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spend.dailySpend}>
                        <Tooltip 
                          cursor={{fill: 'hsl(var(--muted))', opacity: 0.2}} 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                          formatter={(val: number) => formatCurrency(val)}
                        />
                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Strict PII Mode
                  </div>
                  <p className="text-sm text-muted-foreground">Route all PII data to local Azure region</p>
                </div>
                <Switch checked={sensitiveMode} onCheckedChange={setSensitiveMode} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
