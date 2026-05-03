import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIBadge } from "@/components/ai-badge";
import {
  ChevronDown, ChevronUp, Star, AlertTriangle,
  TrendingUp, Mic, Brain, Target,
  CheckCircle2, XCircle, Zap, Award, Users,
  ShieldCheck, Layers, GitBranch, Building2, Globe,
  HelpCircle, Clock, TrendingDown, MessageSquare, DollarSign, Swords
} from "lucide-react";

// ─── 6 Alignment Metrics ───────────────────────────────────────────────────
const METRICS = [
  {
    id: "discovery",
    label: "Discovery First",
    short: "Discovery",
    icon: HelpCircle,
    desc: "Asked qualifying questions before pitching any property or price",
    vedantNote: "Opens every call: budget, timeline, what they've seen — before saying anything about the listing.",
  },
  {
    id: "nextStep",
    label: "Next-Step Locking",
    short: "Next Step",
    icon: Target,
    desc: "Confirmed a specific date or action before ending the call",
    vedantNote: "Never ends a call without a locked next step — inspection booked, callback time agreed, or decision deadline set.",
  },
  {
    id: "urgency",
    label: "Urgency Framing",
    short: "Urgency",
    icon: Zap,
    desc: "Created specific urgency (named buyer, real deadline) — not generic pressure",
    vedantNote: "'There's a buyer from Tuesday's open who's still deciding between this and Holt Avenue. They need an answer by Friday.' — specific, not vague.",
  },
  {
    id: "competitor",
    label: "Competitor Response",
    short: "Competitor",
    icon: Swords,
    desc: "Used DOM data comparison when a competitor agency was mentioned",
    vedantNote: "Never argues brand vs brand. Always pivots: 'Our DOM in this suburb is 22 days vs their 41. Here's why that matters for your price.'",
  },
  {
    id: "price",
    label: "Price Conviction",
    short: "Price",
    icon: DollarSign,
    desc: "Held the price guide with comparable data — didn't defer or soften without evidence",
    vedantNote: "If a vendor pushes back on guide, Vedant walks through the 3 most recent comps before considering any adjustment.",
  },
  {
    id: "depth",
    label: "Call Depth",
    short: "Depth",
    icon: MessageSquare,
    desc: "Substantive call with structured check-in — not a quick status update",
    vedantNote: "Vendor update calls average 8–10 mins. Structured: what's happened, what's coming, one proactive observation the vendor didn't ask for.",
  },
];

// ─── Vedant — the 100% baseline ────────────────────────────────────────────
const VEDANT = {
  name: "Vedant Patel",
  role: "Selling Principal",
  initials: "VP",
  callsThisWeek: 23,
  listingsWon: 4,
  appraised: 5,
  conversionRate: 80,
  metrics: { discovery: 100, nextStep: 100, urgency: 100, competitor: 100, price: 100, depth: 100 },
};

// ─── Assistants with per-metric scores ─────────────────────────────────────
const ASSISTANTS = [
  {
    id: "a1",
    name: "Sophie Chen",
    role: "Senior Assistant",
    initials: "SC",
    tenure: "3 years with Vedant",
    callsThisWeek: 18,
    handledAutonomously: 14,
    escalatedToVedant: 4,
    metrics: { discovery: 95, nextStep: 94, urgency: 72, competitor: 97, price: 92, depth: 94 },
    weeklyFocus: "Listen back to Vedant's Neutral Bay buyer call from Tuesday — the way he names a specific competing buyer (not 'the market') is the exact pattern to replicate for urgency.",
    routineHandled: ["Buyer enquiry responses", "Vendor update calls", "Open home follow-ups", "Appraisal scheduling"],
    highlightCall: "Handled a frustrated Cremorne vendor (34 DOM) without escalation — used Vedant's pricing conversation script precisely. Vendor agreed to guide adjustment.",
  },
  {
    id: "a2",
    name: "James Patel",
    role: "Sales Assistant",
    initials: "JP",
    tenure: "14 months with Vedant",
    callsThisWeek: 15,
    handledAutonomously: 10,
    escalatedToVedant: 5,
    metrics: { discovery: 62, nextStep: 55, urgency: 84, competitor: 88, price: 86, depth: 80 },
    weeklyFocus: "Before every call, write down: 'What is the one next step I need to lock before this call ends?' Discovery and next-step locking are the two habits to build this week — everything else is already strong.",
    routineHandled: ["Buyer enquiry responses", "Open home follow-ups", "Pre-auction buyer qualification"],
    highlightCall: null,
  },
  {
    id: "a3",
    name: "Mia Russo",
    role: "Operations Assistant",
    initials: "MR",
    tenure: "2 years with Vedant",
    callsThisWeek: 22,
    handledAutonomously: 20,
    escalatedToVedant: 2,
    metrics: { discovery: 91, nextStep: 89, urgency: 88, competitor: 87, price: 68, depth: 90 },
    weeklyFocus: "You're ready to handle routine price-conversation calls. Run through the comparable data script with Sophie before Thursday's Neutral Bay vendor update — one practise run will fix this.",
    routineHandled: ["Vendor update calls", "Landlord check-ins", "Maintenance coordination", "Contract admin follow-ups"],
    highlightCall: "Handled all 4 post-auction vendor calls independently this week — a task Vedant previously had to manage personally every Saturday.",
  },
  {
    id: "a4",
    name: "Liam O'Brien",
    role: "Junior Assistant",
    initials: "LO",
    tenure: "4 months with Vedant",
    callsThisWeek: 12,
    handledAutonomously: 7,
    escalatedToVedant: 5,
    metrics: { discovery: 38, nextStep: 32, urgency: 70, competitor: 72, price: 74, depth: 58 },
    weeklyFocus: "One focus only: ask 3 discovery questions before mentioning any property feature. Write them on a card next to your screen. Next step locking will follow naturally once discovery is locked in.",
    routineHandled: ["Initial buyer enquiry responses", "Open home welcome and registration"],
    highlightCall: null,
  },
  {
    id: "a5",
    name: "Priya Watt",
    role: "Leasing & Enquiry Assistant",
    initials: "PW",
    tenure: "18 months with Vedant",
    callsThisWeek: 16,
    handledAutonomously: 14,
    escalatedToVedant: 2,
    metrics: { discovery: 88, nextStep: 87, urgency: 82, competitor: 65, price: 84, depth: 88 },
    weeklyFocus: "When a rental enquirer mentions another agency, don't apologise — use the DOM script. 'Our vacancy periods average 8 days in this suburb. Here's why that matters for your yield.' Same principle as a sales competitor response.",
    routineHandled: ["Rental enquiry calls", "Tenant pre-qualification", "Prospective tenant follow-up", "Routine landlord queries"],
    highlightCall: "Converted 2 rental enquirers into open home attendees for the Mosman listing — handled entirely independently.",
  },
];

const DIGEST = {
  week: "Week of 28 Apr – 2 May 2026",
  totalCalls: 106,
  handledAutonomously: 65,
  escalatedToVedant: 18,
  autonomyRate: 78,
  avgAlignmentScore: 80,
  alignmentTrend: [64, 68, 71, 74, 77, 80],
  topInsight: "Sophie handled a price-reduction conversation with a frustrated Cremorne vendor entirely independently — outcome: vendor agreed to guide adjustment without Vedant's involvement. This is the target for the whole team.",
  vedantTimeSaved: "Approx. 11 hours of routine call time handled by the team this week — Vedant's direct call load down from 41 calls/week (6 months ago) to 23.",
  nextGap: "Priority gap this week: Discovery First and Next-Step Locking for Liam (38, 32) and James (62, 55). Same two metrics, same fix.",
};

// ─── Helpers ────────────────────────────────────────────────────────────────
function avgScore(metrics: Record<string, number>) {
  const vals = Object.values(metrics);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function metricColor(score: number) {
  if (score >= 88) return { text: "text-green-600", bg: "bg-green-500/10 border-green-500/20", bar: "bg-green-500" };
  if (score >= 70) return { text: "text-yellow-600", bg: "bg-yellow-500/10 border-yellow-500/20", bar: "bg-yellow-500" };
  return { text: "text-destructive", bg: "bg-destructive/10 border-destructive/20", bar: "bg-destructive" };
}

function OverallBar({ score }: { score: number }) {
  const c = metricColor(score);
  return (
    <div className="w-full bg-muted rounded-full overflow-hidden h-1.5">
      <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${c.bar}`} />
    </div>
  );
}

// ─── Metric Grid (compact, shown inline on cards) ───────────────────────────
function MetricGrid({ metrics, showVedant = false }: { metrics: Record<string, number>; showVedant?: boolean }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
      {METRICS.map(m => {
        const score = metrics[m.id];
        const c = metricColor(score);
        return (
          <div key={m.id} title={`${m.label}: ${m.desc}`}
            className={`rounded-lg border px-2 py-2 text-center cursor-default ${showVedant ? "bg-primary/5 border-primary/20" : c.bg}`}>
            <div className={`text-base font-bold tabular-nums ${showVedant ? "text-primary" : c.text}`}>
              {showVedant ? "100" : score}
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">{m.short}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Assistant Card ─────────────────────────────────────────────────────────
function AssistantCard({ assistant, index }: { assistant: typeof ASSISTANTS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const overall = avgScore(assistant.metrics);
  const weakMetrics = METRICS.filter(m => assistant.metrics[m.id] < 70);
  const c = metricColor(overall);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
      <Card className={`bg-card/50 border-border/50 overflow-hidden ${overall >= 88 ? "border-green-500/25" : overall < 70 ? "border-destructive/20" : ""}`}>
        {overall >= 88 && <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />}
        {overall < 70 && <div className="h-1 w-full bg-destructive/60" />}

        <div className="p-5 space-y-3">
          {/* Name row */}
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border ${overall >= 88 ? "bg-green-500/15 text-green-600 border-green-500/25" : overall < 70 ? "bg-destructive/15 text-destructive border-destructive/25" : "bg-primary/15 text-primary border-primary/25"}`}>
              {assistant.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{assistant.name}</span>
                <span className="text-xs text-muted-foreground">{assistant.role}</span>
                <Badge variant="outline" className="text-[10px] bg-muted/30">{assistant.tenure}</Badge>
                {weakMetrics.length === 0 && <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Fully aligned</Badge>}
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className={`text-xl font-bold tabular-nums ${c.text}`}>{overall}<span className="text-xs text-muted-foreground font-normal">/100</span></div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                  Overall
                  <AIBadge tip="Average of all 6 alignment metrics. Vedant scores 100 on every metric — he is the baseline, not a participant." />
                </div>
              </div>
              <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-foreground transition-colors">
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Metric grid — always visible */}
          <MetricGrid metrics={assistant.metrics} />

          {/* Weak metric flags */}
          {weakMetrics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Focus:</span>
              {weakMetrics.map(m => (
                <Badge key={m.id} variant="outline" className="text-[10px] bg-destructive/8 text-destructive border-destructive/20 gap-1">
                  <m.icon className="h-2.5 w-2.5" /> {m.label} — {assistant.metrics[m.id]}
                </Badge>
              ))}
            </div>
          )}

          {/* Calls stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-2">
            <span>{assistant.callsThisWeek} calls</span>
            <span className="text-green-600 font-medium">{assistant.handledAutonomously} handled independently</span>
            <span className="text-primary font-medium">{assistant.escalatedToVedant} escalated to Vedant</span>
          </div>
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border/40">
                {/* Per-metric breakdown with context */}
                <div className="pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
                    Metric Breakdown vs Vedant's Baseline
                    <AIBadge tip="Each metric shows how consistently this assistant replicates the specific behaviour Vedant applies on every call." />
                  </h4>
                  <div className="space-y-2">
                    {METRICS.map(m => {
                      const score = assistant.metrics[m.id];
                      const mc = metricColor(score);
                      return (
                        <div key={m.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <m.icon className={`h-3 w-3 ${mc.text}`} />
                              <span className="text-xs font-medium">{m.label}</span>
                              <span className="text-[10px] text-muted-foreground hidden sm:inline">— {m.desc}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full overflow-hidden h-1">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`h-full rounded-full ${mc.bar}`} />
                            </div>
                          </div>
                          <span className={`text-sm font-bold tabular-nums w-8 text-right ${mc.text}`}>{score}</span>
                          <span className="text-[10px] text-muted-foreground w-10 text-right">/ 100</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Routine work */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Handled independently</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {assistant.routineHandled.map(r => (
                      <Badge key={r} variant="outline" className="text-[10px] bg-card/50">{r}</Badge>
                    ))}
                  </div>
                </div>

                {/* Weekly focus */}
                <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5" /> This Week's Focus
                    <AIBadge tip="Derived from the lowest-scoring metric this week — one thing to fix, not a list." />
                  </h4>
                  <p className="text-xs text-foreground/80 leading-relaxed">{assistant.weeklyFocus}</p>
                </div>

                {/* Highlight call */}
                {assistant.highlightCall && (
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-green-600 mb-1 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5" /> Call Highlight
                    </h4>
                    <p className="text-xs text-foreground/80 leading-relaxed">{assistant.highlightCall}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TeamAlignment() {
  const [digestExpanded, setDigestExpanded] = useState(true);
  const [showPlaybook, setShowPlaybook] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 flex-wrap">
              Branch Alignment
              <AIBadge size="md" tip="AI scores each assistant across 6 metrics derived from Vedant's own call patterns. Vedant is 100% on all metrics — he is the baseline." />
              <Badge variant="outline" className="text-[10px] text-primary border-primary/25 gap-1 font-normal">
                <GitBranch className="h-2.5 w-2.5" /> Pilot · Vedant's Branch
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-1">
              Vedant's 5 assistants handle the routine 80%, his way — freeing him for the critical 20%.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start flex-wrap">
            <Badge variant="outline" className="text-xs bg-green-500/5 text-green-600 border-green-500/20 gap-1.5">
              <CheckCircle2 className="h-3 w-3" /> {DIGEST.handledAutonomously} calls handled autonomously
            </Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20 gap-1.5">
              <Mic className="h-3 w-3" /> {DIGEST.totalCalls} calls captured
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Vedant — 100% baseline */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="bg-card/60 border-primary/30 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary shrink-0">VP</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-lg">Vedant Patel</span>
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">Selling Principal — Baseline</Badge>
                  <AIBadge tip="Vedant scores 100% on every metric. The AI learns his patterns from his actual calls — his specific language, not an industry template." />
                  <span className="text-xl font-bold text-primary ml-auto">100<span className="text-xs text-muted-foreground font-normal">/100</span></span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">His approach on every call is what every metric is measured against.</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground text-xs">{DIGEST.week}:</span>
                  <span className="font-medium">{VEDANT.callsThisWeek} calls</span>
                  <span className="text-green-600 font-medium">{VEDANT.listingsWon} listings won</span>
                  <span className="text-muted-foreground">{VEDANT.conversionRate}% conversion</span>
                </div>
              </div>
              <button onClick={() => setShowPlaybook(!showPlaybook)} className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0">
                {showPlaybook ? "Hide" : "View"} the 6 metrics
                {showPlaybook ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            {/* Vedant's metric grid */}
            <MetricGrid metrics={VEDANT.metrics} showVedant />

            <AnimatePresence>
              {showPlaybook && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="border-t border-border/50 pt-4 space-y-2">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">What Vedant does on every call — what each metric measures:</p>
                    {METRICS.map((m, i) => (
                      <div key={m.id} className="flex items-start gap-3 text-xs">
                        <div className="h-5 w-5 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                        <div>
                          <span className="font-semibold text-foreground">{m.label} — </span>
                          <span className="text-muted-foreground">{m.vedantNote}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Monday Digest */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-card/50 border-border/50">
          <div className="cursor-pointer" onClick={() => setDigestExpanded(!digestExpanded)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4 text-primary" />
                  Monday Morning Digest — for Vedant
                  <AIBadge tip="Delivered Monday 7am. A principal's view of his branch alignment — not an HR report." />
                  <Badge variant="outline" className="text-[10px] bg-muted/30">{DIGEST.week}</Badge>
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-green-600">{DIGEST.autonomyRate}%</div>
                      <div className="text-[10px] text-muted-foreground">Autonomy rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary">{DIGEST.avgAlignmentScore}/100</div>
                      <div className="text-[10px] text-muted-foreground">Branch alignment</div>
                    </div>
                  </div>
                  {digestExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>
            </CardHeader>
          </div>

          <AnimatePresence>
            {digestExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <CardContent className="pt-0 space-y-4">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-600 mb-1.5 flex items-center gap-1.5">
                      <Award className="h-4 w-4" /> Your team freed up your week
                      <AIBadge tip="AI tracks which calls were handled to completion vs escalated, and calculates hours returned to Vedant." />
                    </h4>
                    <p className="text-sm text-foreground/80">{DIGEST.vedantTimeSaved}</p>
                  </div>

                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                      <Star className="h-4 w-4" /> Best alignment moment this week
                    </h4>
                    <p className="text-sm text-foreground/80">{DIGEST.topInsight}</p>
                  </div>

                  <div className="bg-muted/30 border border-border/40 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Priority gap: </span>
                      <span className="text-sm text-foreground/80">{DIGEST.nextGap}</span>
                    </div>
                  </div>

                  {/* Team metric heatmap */}
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-3 flex items-center gap-1.5">
                      Team metric overview — where each assistant stands vs Vedant's baseline
                      <AIBadge tip="Green = aligned (≥88). Yellow = developing (70–87). Red = focus needed (<70)." />
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr>
                            <th className="text-left text-muted-foreground font-medium pb-2 pr-4 w-32">Assistant</th>
                            {METRICS.map(m => (
                              <th key={m.id} className="text-center text-muted-foreground font-medium pb-2 px-1 w-16">
                                <div className="flex flex-col items-center gap-1">
                                  <m.icon className="h-3 w-3" />
                                  <span className="text-[10px]">{m.short}</span>
                                </div>
                              </th>
                            ))}
                            <th className="text-center text-muted-foreground font-medium pb-2 px-1 w-16">Overall</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-1">
                          {/* Vedant row */}
                          <tr className="border-b border-border/30">
                            <td className="py-2 pr-4 font-semibold text-primary">Vedant (baseline)</td>
                            {METRICS.map(m => (
                              <td key={m.id} className="py-2 px-1 text-center">
                                <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-primary/10 text-primary">100</span>
                              </td>
                            ))}
                            <td className="py-2 px-1 text-center">
                              <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-primary/10 text-primary">100</span>
                            </td>
                          </tr>
                          {ASSISTANTS.map(a => {
                            const overall = avgScore(a.metrics);
                            return (
                              <tr key={a.id} className="border-b border-border/20">
                                <td className="py-2 pr-4 font-medium">{a.name.split(" ")[0]}</td>
                                {METRICS.map(m => {
                                  const s = a.metrics[m.id];
                                  const mc = metricColor(s);
                                  return (
                                    <td key={m.id} className="py-2 px-1 text-center">
                                      <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold border ${mc.bg} ${mc.text}`}>{s}</span>
                                    </td>
                                  );
                                })}
                                <td className="py-2 px-1 text-center">
                                  <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold border ${metricColor(overall).bg} ${metricColor(overall).text}`}>{overall}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Alignment trend */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Branch alignment trend — last 6 weeks</p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {DIGEST.alignmentTrend.map((score, i) => (
                        <div key={i} className="text-center">
                          <div className="bg-muted/50 rounded h-14 flex items-end justify-center p-1 mb-1">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${(score / 100) * 46}px` }} transition={{ delay: i * 0.1, duration: 0.5 }}
                              className={`w-full rounded-sm ${i === DIGEST.alignmentTrend.length - 1 ? "bg-primary" : "bg-primary/30"}`} />
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium">{score}</div>
                          <span className="text-[9px] text-muted-foreground/60">{["W47", "W48", "W49", "W50", "W51", "W52"][i]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 mt-2">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Branch alignment up 16 points over 6 weeks
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Assistant cards */}
      <div>
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" /> Vedant's 5 Assistants — scores across all 6 metrics
        </h2>
        <div className="space-y-3">
          {ASSISTANTS.map((assistant, i) => (
            <AssistantCard key={assistant.id} assistant={assistant} index={i} />
          ))}
        </div>
      </div>

      {/* What this scales to */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Card className="bg-card/40 border-border/40 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" /> What one branch becomes
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Vedant's branch is the pilot. The same model — with its own source playbook and 6 metrics — can align any team to any principal's approach.
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] bg-muted/30 shrink-0">Roadmap</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { phase: "Now", icon: GitBranch, label: "Vedant's Branch", detail: "5 assistants scored across 6 metrics. Routine 80% handled. Vedant reserved for critical 20%.", status: "active", branches: ["Vedant Patel (baseline)", "Sophie", "James", "Mia", "Liam", "Priya"] },
                { phase: "Next", icon: Building2, label: "Sales Team Branch", detail: "All TAG sales agents aligned to the TAG sales playbook. Consistent language, consistent scores, weekly digest for the principal.", status: "upcoming", branches: ["TAG Sales Playbook", "All sales agents", "Cross-agent scoring", "Weekly team digest"] },
                { phase: "Future", icon: Globe, label: "Org-Wide Alignment", detail: "Every team — PM, sales, BDM, leasing — each with their own source and their own 6 metrics. Leadership sees across all branches.", status: "vision", branches: ["PM branch", "BDM branch", "Leasing branch", "Operations branch"] },
              ].map(row => (
                <div key={row.phase} className={`rounded-lg border p-4 space-y-3 ${row.status === "active" ? "bg-primary/5 border-primary/25" : row.status === "upcoming" ? "bg-muted/30 border-border/50" : "bg-muted/15 border-border/30 opacity-75"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><row.icon className={`h-4 w-4 ${row.status === "active" ? "text-primary" : "text-muted-foreground"}`} /><span className="text-sm font-semibold">{row.label}</span></div>
                    <Badge variant="outline" className={`text-[10px] ${row.status === "active" ? "bg-green-500/10 text-green-600 border-green-500/20" : row.status === "upcoming" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" : "bg-muted/40 text-muted-foreground"}`}>{row.phase}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{row.detail}</p>
                  <div className="flex flex-wrap gap-1">
                    {row.branches.map((b, i) => (
                      <span key={b} className={`text-[10px] px-2 py-0.5 rounded-full border ${i === 0 ? "bg-primary/10 border-primary/20 text-primary font-medium" : "bg-muted/40 border-border/40 text-muted-foreground"}`}>{b}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/40 pt-3 flex items-start gap-2">
              <Layers className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Vedant's strategy — or the board's strategy — reaches every client interaction, automatically. Each branch has its own source and its own 6 metrics. Leadership sees across all branches without being in every conversation.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
