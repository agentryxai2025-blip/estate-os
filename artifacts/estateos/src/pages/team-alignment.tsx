import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AIBadge } from "@/components/ai-badge";
import {
  Phone, ChevronDown, ChevronUp, Star, AlertTriangle,
  TrendingUp, TrendingDown, Mic, Brain, Target,
  CheckCircle2, XCircle, Clock, Zap, Award, Users
} from "lucide-react";

const AGENTS = [
  {
    id: "a1",
    name: "Vedant Patel",
    role: "Selling Principal",
    initials: "VP",
    alignmentScore: 94,
    callsThisWeek: 23,
    listingsWon: 4,
    appraised: 5,
    conversionRate: 80,
    isTopPerformer: true,
    strengths: ["Discovery questions", "Urgency creation", "Competitor objection handling"],
    gaps: [],
    weeklyFocus: "Benchmark — team should mirror Vedant's price conversation approach.",
    callBreakdown: [
      { type: "Appraisal", count: 5, avgScore: 96 },
      { type: "Vendor Update", count: 9, avgScore: 93 },
      { type: "Buyer Enquiry", count: 6, avgScore: 91 },
      { type: "Negotiation", count: 3, avgScore: 97 },
    ],
    highlightCall: "Cremorne vendor who had competing appraisal from McGrath — Vedant used DOM comparison data to win the mandate at $2.85M guide.",
  },
  {
    id: "a2",
    name: "Hailey Drummond",
    role: "Senior Sales Agent",
    initials: "HD",
    alignmentScore: 78,
    callsThisWeek: 18,
    listingsWon: 2,
    appraised: 4,
    conversionRate: 50,
    isTopPerformer: false,
    strengths: ["Rapport building", "Follow-up consistency", "Buyer relationship management"],
    gaps: ["Price conversation softness — accepting vendor's inflated guide without pushback (3 of 4 appraisals)", "Next-step locking — 6 calls ended without a confirmed follow-up date"],
    weeklyFocus: "Practice the price guide script from the playbook before Thursday's appraisals.",
    callBreakdown: [
      { type: "Appraisal", count: 4, avgScore: 71 },
      { type: "Vendor Update", count: 8, avgScore: 82 },
      { type: "Buyer Enquiry", count: 6, avgScore: 79 },
    ],
    highlightCall: "Strong vendor update call — proactively addressed a stale listing with a price review conversation before the vendor raised it.",
  },
  {
    id: "a3",
    name: "Marcus Chen",
    role: "Sales Agent",
    initials: "MC",
    alignmentScore: 88,
    callsThisWeek: 21,
    listingsWon: 3,
    appraised: 4,
    conversionRate: 75,
    isTopPerformer: false,
    strengths: ["Buyer qualification", "Urgency creation with buyers", "Auction day management"],
    gaps: ["Discovery question consistency — skipped qualifying budget in 4 buyer calls", "Rental investment objection handling needs TAG script"],
    weeklyFocus: "Use the discovery question checklist for first 30 seconds of every buyer call.",
    callBreakdown: [
      { type: "Appraisal", count: 4, avgScore: 89 },
      { type: "Vendor Update", count: 7, avgScore: 91 },
      { type: "Buyer Enquiry", count: 10, avgScore: 85 },
    ],
    highlightCall: "Converted a 'just looking' buyer into an offer within 48 hours using urgency framing — competing property angle worked well.",
  },
  {
    id: "a4",
    name: "Sarah Kim",
    role: "Sales Agent",
    initials: "SK",
    alignmentScore: 71,
    callsThisWeek: 15,
    listingsWon: 0,
    appraised: 3,
    conversionRate: 0,
    isTopPerformer: false,
    strengths: ["Warm tone", "Property knowledge", "Presentation preparation"],
    gaps: ["0 listings won from 3 appraisals this week — price conversations not landing", "Competitor agency objection ('we're also talking to Ray White') not handled with TAG response in any of 3 cases", "Follow-up cadence after appraisal: no contact in 48h post-visit on 2 leads"],
    weeklyFocus: "Priority: review the competitor comparison script before any appraisal. Then review why follow-up is slipping.",
    callBreakdown: [
      { type: "Appraisal", count: 3, avgScore: 58 },
      { type: "Vendor Update", count: 6, avgScore: 74 },
      { type: "Buyer Enquiry", count: 6, avgScore: 77 },
    ],
    highlightCall: null,
  },
  {
    id: "a5",
    name: "Tom Reid",
    role: "Associate Agent",
    initials: "TR",
    alignmentScore: 82,
    callsThisWeek: 14,
    listingsWon: 1,
    appraised: 2,
    conversionRate: 50,
    isTopPerformer: false,
    strengths: ["Buyer follow-up speed", "Open home energy", "First impression quality"],
    gaps: ["Urgency creation on fence-sitter buyers — 4 calls identified as non-committal, no urgency technique used", "Negotiation calls: not using the anchoring approach from playbook"],
    weeklyFocus: "Watch Vedant's negotiation call from Tuesday — share the recording for review.",
    callBreakdown: [
      { type: "Appraisal", count: 2, avgScore: 84 },
      { type: "Vendor Update", count: 5, avgScore: 83 },
      { type: "Buyer Enquiry", count: 7, avgScore: 79 },
    ],
    highlightCall: "Great listing presentation energy — vendor commented positively on preparation. Lost on price guide (too conservative).",
  },
  {
    id: "a6",
    name: "James O'Brien",
    role: "Junior Associate",
    initials: "JO",
    alignmentScore: 65,
    callsThisWeek: 11,
    listingsWon: 0,
    appraised: 1,
    conversionRate: 0,
    isTopPerformer: false,
    strengths: ["Enthusiasm", "Property data recall", "Responsiveness"],
    gaps: ["Discovery question framework: not used in 8 of 11 calls — jumping to features before understanding buyer needs", "Doesn't lock next steps — 9 of 11 calls ended without confirmed action", "Vendor update calls too short (avg 3 mins) — vendors need more substance"],
    weeklyFocus: "Focus on one thing: before every call, write down 3 discovery questions. Ask all 3 before pitching anything.",
    callBreakdown: [
      { type: "Vendor Update", count: 4, avgScore: 61 },
      { type: "Buyer Enquiry", count: 7, avgScore: 66 },
    ],
    highlightCall: null,
  },
];

const DIGEST = {
  week: "Week of 28 Apr – 2 May 2026",
  totalCalls: 102,
  avgAlignmentScore: 80,
  topThisWeek: "Marcus Chen",
  cloneInsight: "Marcus is converting buyer enquiries at 2.4× the team average. Key pattern: he asks for budget in the first 30 seconds (discovery), then ties the property directly to that budget before mentioning inspection. 4 agents are not doing this.",
  teamGaps: [
    { issue: "Next-step locking", affected: 4, detail: "58% of calls this week had no locked follow-up date or action. Industry benchmark: 85%." },
    { issue: "Competitor objection handling", affected: 3, detail: "Only Vedant and Marcus used the preferred TAG response to 'we're talking to other agencies'. 3 agents defaulted to under-selling TAG's DOM advantage." },
    { issue: "Price guide conversation", affected: 2, detail: "2 agents accepted vendor's aspirational price without presenting comparable data. This risks taking overpriced listings that sit and damage our DOM stats." },
  ],
  alignmentTrend: [72, 75, 74, 78, 79, 80],
};

function ScoreBar({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  const color = score >= 85 ? "bg-green-500" : score >= 70 ? "bg-yellow-500" : "bg-destructive";
  return (
    <div className={`w-full bg-muted rounded-full overflow-hidden ${size === "sm" ? "h-1" : "h-1.5"}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

function AgentCard({ agent, index }: { agent: typeof AGENTS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const scoreColor = agent.alignmentScore >= 85 ? "text-green-600" : agent.alignmentScore >= 70 ? "text-yellow-600" : "text-destructive";
  const isAtRisk = agent.alignmentScore < 72;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
      <Card className={`bg-card/50 border-border/50 overflow-hidden ${agent.isTopPerformer ? "border-green-500/30" : isAtRisk ? "border-destructive/20" : ""}`}>
        {agent.isTopPerformer && <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />}
        {isAtRisk && <div className="h-1 w-full bg-destructive animate-pulse" />}

        <div className="p-5 cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-start gap-4">
            <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border ${agent.isTopPerformer ? "bg-green-500/20 text-green-600 border-green-500/30" : isAtRisk ? "bg-destructive/20 text-destructive border-destructive/30" : "bg-primary/20 text-primary border-primary/30"}`}>
              {agent.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{agent.name}</span>
                {agent.isTopPerformer && <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20 gap-1"><Award className="h-2.5 w-2.5" /> Top Performer</Badge>}
                {isAtRisk && <Badge variant="outline" className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">Needs Focus</Badge>}
                <span className="text-xs text-muted-foreground">{agent.role}</span>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-xl font-bold tabular-nums ${scoreColor}`}>{agent.alignmentScore}</span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                    <AIBadge tip="Alignment score: how closely this agent's calls match the TAG playbook across discovery, urgency, objection handling, and next-step locking." />
                  </div>
                  <ScoreBar score={agent.alignmentScore} />
                </div>
              </div>
            </div>
            <div className="hidden sm:grid grid-cols-3 gap-4 text-center shrink-0">
              <div>
                <div className="text-lg font-bold">{agent.callsThisWeek}</div>
                <div className="text-[10px] text-muted-foreground">Calls</div>
              </div>
              <div>
                <div className="text-lg font-bold">{agent.appraised}</div>
                <div className="text-[10px] text-muted-foreground">Appraised</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${agent.conversionRate >= 60 ? "text-green-600" : agent.conversionRate > 0 ? "text-yellow-600" : "text-destructive"}`}>{agent.conversionRate}%</div>
                <div className="text-[10px] text-muted-foreground">Conversion</div>
              </div>
            </div>
            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Strengths */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Strengths</h4>
                    <ul className="space-y-1.5">
                      {agent.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gaps */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
                      Alignment Gaps
                      <AIBadge tip="AI identifies these gaps by scoring each call against the TAG playbook and surfacing patterns across this agent's week." />
                    </h4>
                    {agent.gaps.length === 0 ? (
                      <p className="text-xs text-green-600 flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> No gaps identified this week</p>
                    ) : (
                      <ul className="space-y-1.5">
                        {agent.gaps.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs">
                            <XCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{g}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Call breakdown */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Call Scores by Type</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {agent.callBreakdown.map(cb => (
                      <div key={cb.type} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{cb.type}</div>
                        <div className={`text-base font-bold ${cb.avgScore >= 85 ? "text-green-600" : cb.avgScore >= 70 ? "text-yellow-600" : "text-destructive"}`}>{cb.avgScore}</div>
                        <div className="text-[10px] text-muted-foreground">{cb.count} calls</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly focus */}
                <div className={`rounded-lg border p-3 ${isAtRisk ? "bg-destructive/5 border-destructive/20" : "bg-primary/5 border-primary/20"}`}>
                  <h4 className={`text-xs font-semibold mb-1 flex items-center gap-1.5 ${isAtRisk ? "text-destructive" : "text-primary"}`}>
                    <Target className="h-3.5 w-3.5" /> This Week's Focus
                    <AIBadge tip="AI generates one specific, actionable focus area based on this week's call patterns — not a general suggestion but a precise playbook gap." />
                  </h4>
                  <p className="text-xs text-foreground/80">{agent.weeklyFocus}</p>
                </div>

                {/* Highlight call */}
                {agent.highlightCall && (
                  <div className="bg-muted/20 rounded-lg border border-border/40 p-3">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-yellow-500" /> Call Highlight
                    </h4>
                    <p className="text-xs text-foreground/80">{agent.highlightCall}</p>
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

export default function TeamAlignment() {
  const [digestExpanded, setDigestExpanded] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              Sales Team Alignment
              <AIBadge size="md" tip="AI captures, transcribes, and scores every sales call against the TAG playbook. Vedant gets a Monday digest — no manual listening required." />
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-1.5">
              Every agent aligned to the TAG playbook — automatically.
              <AIBadge tip="The playbook is sourced from the TAG Strategy Hub (Wedge 7), so alignment targets update as market strategy shifts each month." />
            </p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20 gap-1.5">
              <Mic className="h-3 w-3" /> {DIGEST.totalCalls} calls captured this week
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Monday Digest */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-card/50 border-primary/20">
          <div className="cursor-pointer" onClick={() => setDigestExpanded(!digestExpanded)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Monday Morning Digest
                  <AIBadge tip="AI-generated weekly summary delivered Monday 7am. Surfaces team gaps, top performer patterns, and one specific focus for the week ahead." />
                  <Badge variant="outline" className="text-[10px] bg-muted/30">{DIGEST.week}</Badge>
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-muted-foreground">Team Alignment</div>
                    <div className="text-lg font-bold text-primary">{DIGEST.avgAlignmentScore}/100</div>
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
                  {/* Who to clone */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1.5">
                      <Award className="h-4 w-4" /> Who to Clone This Week — {DIGEST.topThisWeek}
                      <AIBadge tip="AI identifies the behaviour pattern driving the top performer's results so the whole team can adopt it." />
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{DIGEST.cloneInsight}</p>
                  </div>

                  {/* Team gaps */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-orange-500" /> Team Alignment Gaps
                    </h4>
                    <div className="space-y-2">
                      {DIGEST.teamGaps.map((gap, i) => (
                        <div key={i} className="flex items-start gap-3 bg-muted/30 rounded-lg p-3">
                          <div className="h-6 w-6 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-destructive">{gap.affected}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">{gap.issue}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{gap.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="grid grid-cols-6 gap-1.5">
                    {DIGEST.alignmentTrend.map((score, i) => (
                      <div key={i} className="text-center">
                        <div className="bg-muted/50 rounded h-16 flex items-end justify-center p-1 mb-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(score / 100) * 52}px` }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`w-full rounded-sm ${i === DIGEST.alignmentTrend.length - 1 ? "bg-primary" : "bg-primary/30"}`}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{["W47", "W48", "W49", "W50", "W51", "W52"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-green-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Team alignment up 8 points over 6 weeks
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Agent cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Individual Agent Alignment
          <span className="text-sm font-normal text-muted-foreground">— click any card to expand</span>
        </h2>
        <div className="space-y-3">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>

      {/* How it works */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Card className="bg-muted/20 border-border/40">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> How Alignment Scores Are Calculated
              <AIBadge tip="The scoring model is trained on TAG's own call history and Vedant's playbook — not a generic real estate template." />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "01", label: "Capture", icon: Mic, desc: "Every sales call recorded and transcribed with consent. Appraisals, vendor updates, buyer enquiries, negotiations." },
                { step: "02", label: "Score", icon: Brain, desc: "AI scores each call against the TAG playbook: discovery used, urgency created, objections handled, next step locked." },
                { step: "03", label: "Align", icon: Target, desc: "Monday digest surfaces gaps and top performer patterns. One clear focus per agent — not a report card, a brief." },
              ].map(item => (
                <div key={item.step} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary font-semibold mb-0.5">{item.step} — {item.label}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
