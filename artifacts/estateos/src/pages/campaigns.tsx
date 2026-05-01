import React, { useState } from "react";
import { useListCampaigns, getListCampaignsQueryKey, useApproveCampaignDraft } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Megaphone, Mail, Users, Eye, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Campaigns() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: campaigns, isLoading } = useListCampaigns({}, { query: { queryKey: getListCampaignsQueryKey({}) } });

  const approveMutation = useApproveCampaignDraft({
    mutation: {
      onSuccess: () => {
        toast({ title: "Draft Approved", description: "The vendor update email has been queued for sending." });
        queryClient.invalidateQueries({ queryKey: getListCampaignsQueryKey({}) });
      }
    }
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'draft-ready': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'approved': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'sent': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Campaigns</h1>
          <p className="text-muted-foreground mt-1">Review AI-drafted weekly vendor updates.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {campaigns?.map((campaign, i) => {
              const isExpanded = expandedId === campaign.id;
              const isDraftReady = campaign.draftStatus === 'draft-ready';

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`bg-card/50 overflow-hidden transition-colors border-border/50 ${isDraftReady ? 'border-orange-500/30' : ''}`}>
                    <div 
                      className="p-6 cursor-pointer hover:bg-muted/40 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : campaign.id)}
                    >
                      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-primary/10 text-primary`}>
                            <Megaphone className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-primary/20 text-primary">Week {campaign.weekNumber}</Badge>
                              <Badge variant="outline" className={getStatusColor(campaign.draftStatus)}>
                                {campaign.draftStatus.replace('-', ' ').toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">Listed: {new Date(campaign.listingDate).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-lg font-semibold mt-1">{campaign.propertyAddress}</h3>
                            <p className="text-sm text-muted-foreground mt-1">Vendor: {campaign.vendorName} • Agent: {campaign.agentName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex gap-4 text-center">
                            <div>
                              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Eye className="h-3 w-3" /> Enq</div>
                              <div className="font-semibold">{campaign.enquiries}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Users className="h-3 w-3" /> Insp</div>
                              <div className="font-semibold">{campaign.inspections}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><CheckCircle2 className="h-3 w-3" /> Off</div>
                              <div className="font-semibold">{campaign.offers}</div>
                            </div>
                          </div>
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
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                  <Sparkles className="h-5 w-5" /> AI Drafted Email
                                </div>
                                <div className="bg-card p-6 rounded-md border border-border/50 space-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Subject:</p>
                                    <p className="font-medium">{campaign.emailSubject || `Weekly Update: ${campaign.propertyAddress}`}</p>
                                  </div>
                                  <div className="h-px bg-border/50 w-full" />
                                  <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                                    {campaign.emailBody || "We had a solid week of inspections with strong buyer interest..."}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-primary" /> AI Strategy Reasoning
                                  </h4>
                                  <div className="bg-primary/5 p-4 rounded-md border border-primary/20 space-y-2">
                                    <p className="text-sm text-foreground/80">{campaign.aiReasoning || "Interest is high but offers are coming in slightly under guide. Recommending a hold strategy this week."}</p>
                                    <div className="text-xs text-primary mt-2 font-medium">Confidence Score: {campaign.confidenceScore || 88}%</div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Price Recommendation</h4>
                                  <div className="bg-card p-4 rounded-md border border-border/50 text-sm">
                                    <p className="font-medium">{campaign.priceRecommendation || "Maintain current guide"}</p>
                                    <p className="text-muted-foreground mt-1">Current guide: {campaign.priceGuide}</p>
                                  </div>
                                </div>

                                {isDraftReady && (
                                  <Button 
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => approveMutation.mutate({ data: {} })}
                                    disabled={approveMutation.isPending}
                                  >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Approve & Send to Vendor
                                  </Button>
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
