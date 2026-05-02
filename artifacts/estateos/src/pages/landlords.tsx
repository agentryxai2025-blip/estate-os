import React, { useState, useMemo } from "react";
import { useListLandlords, getListLandlordsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Mail, Phone, Building2, AlertTriangle, TrendingDown, Clock, Zap, ChevronRight, ArrowUpDown, CalendarClock, DollarSign } from "lucide-react";
import { AIBadge } from "@/components/ai-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

function daysSince(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function contactLabel(days: number) {
  if (days <= 7) return { label: `${days}d ago`, cls: "bg-green-500/10 text-green-600 border-green-500/20" };
  if (days <= 21) return { label: `${days}d ago`, cls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" };
  if (days <= 45) return { label: `${days}d ago`, cls: "bg-orange-500/10 text-orange-500 border-orange-500/20" };
  return { label: `${days}d ago`, cls: "bg-destructive/10 text-destructive border-destructive/20" };
}

type SortKey = "risk-desc" | "risk-asc" | "contact-overdue" | "portfolio-value" | "name";
type RiskFilter = "all" | "critical" | "high" | "medium" | "low";

const RISK_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

const getChurnRiskColor = (risk: string) => {
  switch (risk) {
    case 'critical': return 'text-destructive';
    case 'high': return 'text-orange-500';
    case 'medium': return 'text-yellow-600';
    default: return 'text-green-600';
  }
};

const getChurnRiskBgColor = (risk: string) => {
  switch (risk) {
    case 'critical': return 'bg-destructive/10 border-destructive/20';
    case 'high': return 'bg-orange-500/10 border-orange-500/20';
    case 'medium': return 'bg-yellow-500/10 border-yellow-500/20';
    default: return 'bg-green-500/10 border-green-500/20';
  }
};

const RISK_BADGE: Record<string, string> = {
  critical: "bg-destructive/20 text-destructive border-destructive/30",
  high: "bg-orange-500/20 text-orange-500 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  low: "bg-green-500/20 text-green-600 border-green-500/30",
};

export default function Landlords() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("risk-desc");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const { toast } = useToast();

  const { data: landlords, isLoading } = useListLandlords({ query: { queryKey: getListLandlordsQueryKey() } });

  const risksWithDays = useMemo(() => {
    if (!landlords) return [];
    return landlords.map(l => ({ ...l, daysSinceContact: daysSince(l.lastContact) }));
  }, [landlords]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: 0, critical: 0, high: 0, medium: 0, low: 0 };
    risksWithDays.forEach(l => { c.all++; c[l.churnRisk]++; });
    return c;
  }, [risksWithDays]);

  const priorityLandlords = useMemo(() =>
    risksWithDays
      .filter(l => l.churnRisk === 'critical' || (l.churnRisk === 'high' && l.daysSinceContact > 30))
      .sort((a, b) => b.churnScore - a.churnScore)
      .slice(0, 3),
    [risksWithDays]
  );

  const processed = useMemo(() => {
    let list = risksWithDays.filter(l =>
      (riskFilter === "all" || l.churnRisk === riskFilter) &&
      l.name.toLowerCase().includes(search.toLowerCase())
    );

    list = [...list].sort((a, b) => {
      switch (sortKey) {
        case "risk-desc": return b.churnScore - a.churnScore;
        case "risk-asc": return a.churnScore - b.churnScore;
        case "contact-overdue": return b.daysSinceContact - a.daysSinceContact;
        case "portfolio-value": return b.portfolioValue - a.portfolioValue;
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return list;
  }, [risksWithDays, riskFilter, search, sortKey]);

  const handleLogCall = (name: string) => {
    toast({ title: "Call Logged", description: `Contact with ${name} recorded. Last contact updated to today.` });
  };
  const handleEmail = (name: string) => {
    toast({ title: "Email Drafted", description: `AI is drafting a follow-up email to ${name}...` });
  };

  const FILTER_TABS: { key: RiskFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "critical", label: "Critical" },
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Landlord Rent Roll
            <AIBadge size="md" tip="AI ranks every landlord by churn probability using 12+ signals: contact recency, vacancy rate, maintenance frequency, complaint history, and local market alternatives." />
          </h1>
          <p className="text-muted-foreground mt-1">
            AI churn risk monitoring — <span className="text-destructive font-medium">{counts.critical} critical</span> · <span className="text-orange-500 font-medium">{counts.high} high</span> · <span className="text-yellow-600 font-medium">{counts.medium} medium</span> · <span className="text-green-600 font-medium">{counts.low} low</span>
          </p>
        </div>
        <Button>Add Landlord</Button>
      </div>

      {/* Today's Priority Strip */}
      {!isLoading && priorityLandlords.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <Zap className="h-4 w-4 fill-destructive" />
              Today's Priority — Needs Attention Now
              <AIBadge tip="AI surfaces these landlords daily based on risk score trajectory, days since last contact, and upcoming lease events — so no high-risk relationship slips through." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {priorityLandlords.map(l => {
                const contact = contactLabel(l.daysSinceContact);
                return (
                  <div key={l.id} className="flex items-center gap-3 bg-card/60 border border-border/50 rounded-lg px-4 py-3">
                    <Avatar className="h-9 w-9 shrink-0 border border-border">
                      <AvatarFallback className="bg-destructive/20 text-destructive text-xs font-bold">{l.avatarInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{l.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{l.topRiskFactors[0]}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-lg font-bold ${getChurnRiskColor(l.churnRisk)}`}>{l.churnScore}</span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${contact.cls}`}>
                        <Clock className="h-2.5 w-2.5 mr-1" />{contact.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search landlord name..."
            className="pl-9 bg-card/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 bg-muted/50 border border-border/50 rounded-lg p-1">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setRiskFilter(tab.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                riskFilter === tab.key
                  ? 'bg-card shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                riskFilter === tab.key ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
          <SelectTrigger className="w-[200px] bg-card/50 gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="risk-desc">
              <div className="flex items-center gap-2"><TrendingDown className="h-4 w-4" /> Highest Risk First</div>
            </SelectItem>
            <SelectItem value="risk-asc">
              <div className="flex items-center gap-2"><TrendingDown className="h-4 w-4 rotate-180" /> Lowest Risk First</div>
            </SelectItem>
            <SelectItem value="contact-overdue">
              <div className="flex items-center gap-2"><CalendarClock className="h-4 w-4" /> Most Overdue Contact</div>
            </SelectItem>
            <SelectItem value="portfolio-value">
              <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Portfolio Value</div>
            </SelectItem>
            <SelectItem value="name">
              <div className="flex items-center gap-2"><ArrowUpDown className="h-4 w-4" /> Name A–Z</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-72" />)}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {processed.map((landlord, i) => {
              const isHighRisk = landlord.churnRisk === 'critical' || landlord.churnRisk === 'high';
              const contact = contactLabel(landlord.daysSinceContact);

              return (
                <motion.div
                  key={landlord.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`bg-card/50 overflow-hidden border-border/50 h-full flex flex-col ${isHighRisk ? 'border-destructive/30' : ''}`}>
                    {isHighRisk && <div className="h-1 w-full bg-gradient-to-r from-destructive via-orange-500 to-destructive animate-pulse" />}

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-11 w-11 border border-border shrink-0">
                            <AvatarFallback className={`font-bold text-sm ${isHighRisk ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                              {landlord.avatarInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base leading-tight">{landlord.name}</CardTitle>
                            <CardDescription className="flex gap-3 mt-0.5 text-xs">
                              <span className="flex items-center"><Building2 className="h-3 w-3 mr-1" />{landlord.propertiesCount} props</span>
                              <span>{formatCurrency(landlord.portfolioValue)}</span>
                            </CardDescription>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${RISK_BADGE[landlord.churnRisk]}`}>
                            {landlord.churnRisk.toUpperCase()}
                          </Badge>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-bold tabular-nums ${getChurnRiskColor(landlord.churnRisk)}`}>{landlord.churnScore}</span>
                            <span className="text-xs text-muted-foreground">/ 100</span>
                            <AIBadge tip="Composite AI score 0–100. Predicts the probability this landlord will leave within 90 days, recalculated nightly from portfolio and contact data." />
                          </div>
                        </div>
                      </div>

                      {/* Risk score bar */}
                      <div className="mt-3 space-y-1">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${landlord.churnScore}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 + 0.2, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              landlord.churnScore >= 80 ? 'bg-destructive' :
                              landlord.churnScore >= 60 ? 'bg-orange-500' :
                              landlord.churnScore >= 40 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                          />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col gap-4">
                      {/* Contact info + last contact */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground min-w-0">
                          <div className="flex items-center gap-1.5 truncate"><Mail className="h-3 w-3 shrink-0" />{landlord.email}</div>
                          <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 shrink-0" />{landlord.phone}</div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-[10px] text-muted-foreground mb-1 flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" /> Last contact
                          </div>
                          <Badge variant="outline" className={`text-xs ${contact.cls}`}>
                            {contact.label}
                          </Badge>
                        </div>
                      </div>

                      {/* Risk factors + action */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-border/50 flex-1">
                        <div>
                          <h4 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wide">Risk Signals</h4>
                          <ul className="space-y-1.5">
                            {landlord.topRiskFactors.map((factor, idx) => (
                              <li key={idx} className="text-xs flex items-start gap-1.5">
                                <AlertTriangle className={`h-3 w-3 shrink-0 mt-0.5 ${
                                  idx === 0 ? 'text-destructive' : 'text-orange-500/70'
                                }`} />
                                <span className={idx === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`p-3 rounded-lg border text-xs ${getChurnRiskBgColor(landlord.churnRisk)}`}>
                          <h4 className={`font-semibold mb-1.5 flex items-center gap-1 ${getChurnRiskColor(landlord.churnRisk)}`}>
                            <Zap className="h-3 w-3" /> AI Recommendation
                            <AIBadge tip="AI analyses risk signals and generates a specific, actionable outreach strategy tailored to this landlord's situation." />
                          </h4>
                          <p className="text-foreground/80 leading-relaxed">{landlord.recommendedIntervention}</p>
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div className="flex gap-2 pt-2 border-t border-border/30">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-8 text-xs gap-1.5"
                          onClick={() => handleLogCall(landlord.name)}
                        >
                          <Phone className="h-3 w-3" /> Log Call
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-8 text-xs gap-1.5"
                          onClick={() => handleEmail(landlord.name)}
                        >
                          <Mail className="h-3 w-3" /> Draft Email
                          <AIBadge tip="AI writes a personalised retention email using this landlord's portfolio performance, recent maintenance outcomes, and relationship history." />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs text-muted-foreground"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}

      {!isLoading && processed.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <TrendingDown className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No landlords match this filter</p>
          <p className="text-sm mt-1">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
