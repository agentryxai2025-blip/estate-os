import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIBadge } from "@/components/ai-badge";
import {
  Phone, ChevronDown, ChevronUp, Star, AlertTriangle,
  TrendingUp, Mic, Brain, Target,
  CheckCircle2, XCircle, Zap, Award, Users, ArrowRight,
  ShieldCheck, Layers
} from "lucide-react";

const VEDANT = {
  name: "Vedant Patel",
  role: "Selling Principal",
  initials: "VP",
  callsThisWeek: 23,
  listingsWon: 4,
  appraised: 5,
  conversionRate: 80,
  signatureApproaches: [
    "Opens every appraisal call with 3 discovery questions before mentioning price",
    "Always anchors a competing-agency conversation with DOM data, not brand claims",
    "Creates urgency by naming a specific competing buyer, never using generic pressure",
    "Locks a next step with a date before ending any vendor call",
    "Closes buyer calls by asking: 'What would make you say yes today?'",
  ],
};

const ASSISTANTS = [
  {
    id: "a1",
    name: "Sophie Chen",
    role: "Senior Assistant",
    initials: "SC",
    tenure: "3 years with Vedant",
    alignmentScore: 91,
    callsThisWeek: 18,
    handledAutonomously: 14,
    escalatedToVedant: 4,
    strengths: [
      "Mirrors Vedant's discovery question sequence consistently",
      "Competitor objection handling — uses DOM data exactly as Vedant does",
      "Vendor updates: same tone, same level of detail, vendors can't tell the difference",
    ],
    gaps: [
      "Urgency creation with buyers: uses generic 'market is moving' language in 3 calls rather than Vedant's specific competing-buyer framing",
    ],
    weeklyFocus: "Listen back to Vedant's Neutral Bay buyer call from Tuesday — the way he names a specific competing buyer is the pattern to replicate.",
    routineHandled: ["Buyer enquiry responses", "Vendor update calls", "Open home follow-ups", "Appraisal scheduling"],
    highlightCall: "Handled a frustrated vendor (Cremorne property, 34 days on market) without escalation — used Vedant's pricing conversation script precisely. Vendor agreed to a guide adjustment.",
  },
  {
    id: "a2",
    name: "James Patel",
    role: "Sales Associate",
    initials: "JP",
    tenure: "14 months with Vedant",
    alignmentScore: 79,
    callsThisWeek: 15,
    handledAutonomously: 10,
    escalatedToVedant: 5,
    strengths: [
      "Buyer follow-up speed and energy — matches Vedant's responsiveness",
      "Property knowledge depth — can answer most buyer questions without checking",
    ],
    gaps: [
      "Next-step locking: 6 of 15 calls ended without a confirmed date or action — Vedant locks 100% of his calls",
      "Discovery sequence skipped in 4 buyer calls — jumped straight to property features",
    ],
    weeklyFocus: "Before every call, write down: 'What is the one next step I need to lock before this call ends?' Make it a habit before the muscle memory forms.",
    routineHandled: ["Buyer enquiry responses", "Open home follow-ups", "Pre-auction buyer qualification"],
    highlightCall: null,
  },
  {
    id: "a3",
    name: "Mia Russo",
    role: "Operations Assistant",
    initials: "MR",
    tenure: "2 years with Vedant",
    alignmentScore: 85,
    callsThisWeek: 22,
    handledAutonomously: 20,
    escalatedToVedant: 2,
    strengths: [
      "Vendor update calls handled end-to-end — Vedant rarely needs to follow up",
      "Tone and warmth aligned — landlords and vendors feel looked after",
      "Proactively raises issues before vendors have to ask",
    ],
    gaps: [
      "Price conversation calls: still defers to Vedant rather than using the comparable data script — 2 calls this week could have been handled independently",
    ],
    weeklyFocus: "You're ready to handle routine price-conversation calls. Run through the comparable data script with Sophie before Thursday's Neutral Bay vendor update.",
    routineHandled: ["Vendor update calls", "Landlord check-ins", "Maintenance coordination", "Contract admin follow-ups"],
    highlightCall: "Handled all 4 of the post-auction vendor calls independently this week — a task Vedant previously had to manage personally every Saturday.",
  },
  {
    id: "a4",
    name: "Liam O'Brien",
    role: "Junior Associate",
    initials: "LO",
    tenure: "4 months with Vedant",
    alignmentScore: 64,
    callsThisWeek: 12,
    handledAutonomously: 7,
    escalatedToVedant: 5,
    strengths: [
      "Enthusiasm and responsiveness — always first to reply to new enquiries",
      "Open home energy matches the standard Vedant sets",
    ],
    gaps: [
      "Discovery questions not used in 9 of 12 calls — pitching features before understanding buyer needs",
      "Doesn't lock next steps — 8 calls ended without a confirmed action",
      "Vendor calls averaging 3 minutes — Vedant's average is 8 minutes with structured check-in",
    ],
    weeklyFocus: "One focus only this week: ask 3 discovery questions before mentioning any property feature. Write them on a card and put it next to your screen.",
    routineHandled: ["Initial buyer enquiry responses", "Open home welcome and registration"],
    highlightCall: null,
  },
  {
    id: "a5",
    name: "Priya Watt",
    role: "Leasing & Enquiry Assistant",
    initials: "PW",
    tenure: "18 months with Vedant",
    alignmentScore: 83,
    callsThisWeek: 16,
    handledAutonomously: 14,
    escalatedToVedant: 2,
    strengths: [
      "Rental enquiry calls handled professionally — matches Vedant's tone",
      "Excellent at qualifying prospective tenants without making them feel interrogated",
      "Follow-up consistency is above average — all open enquiries actioned within 24h",
    ],
    gaps: [
      "Sales enquiry crossover calls: when a rental enquirer asks about buying, Priya doesn't bridge to Vedant's buyer discovery questions",
    ],
    weeklyFocus: "When a rental enquirer mentions they're 'thinking about buying eventually', that's a live sales lead — use the 3 discovery questions to qualify and hand off to Vedant or James.",
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
  topInsight: "Sophie handled a price-reduction conversation with a frustrated Cremorne vendor entirely independently — outcome: vendor agreed to guide adjustment without Vedant's involvement. This is the target behaviour for the whole team.",
  vedantTimeSaved: "Approx. 11 hours of routine call time handled by the team this week — Vedant's direct call load reduced from 41 calls/week (6 months ago) to 23.",
  nextGap: "Next milestone: get Liam and James next-step locking to >85% — currently the biggest gap between team behaviour and Vedant's approach.",
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 85 ? "bg-green-500" : score >= 70 ? "bg-yellow-500" : "bg-destructive";
  return (
    <div className="w-full bg-muted rounded-full overflow-hidden h-1.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

function AssistantCard({ assistant, index }: { assistant: typeof ASSISTANTS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const scoreColor = assistant.alignmentScore >= 85 ? "text-green-600" : assistant.alignmentScore >= 70 ? "text-yellow-600" : "text-destructive";
  const isNew = assistant.alignmentScore < 70;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
      <Card className={`bg-card/50 border-border/50 overflow-hidden ${assistant.alignmentScore >= 88 ? "border-green-500/25" : isNew ? "border-yellow-500/20" : ""}`}>
        {assistant.alignmentScore >= 88 && <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />}

        <div className="p-5 cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-start gap-4">
            <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border ${assistant.alignmentScore >= 85 ? "bg-green-500/15 text-green-600 border-green-500/25" : isNew ? "bg-yellow-500/15 text-yellow-600 border-yellow-500/25" : "bg-primary/15 text-primary border-primary/25"}`}>
              {assistant.initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold">{assistant.name}</span>
                <span className="text-xs text-muted-foreground">{assistant.role}</span>
                <Badge variant="outline" className="text-[10px] bg-muted/30">{assistant.tenure}</Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      Aligned to Vedant's approach
                      <AIBadge tip="Score measures how closely this assistant's calls replicate Vedant's specific patterns: discovery sequence, urgency language, next-step locking, competitor responses." />
                    </span>
                    <span className={`text-base font-bold tabular-nums ${scoreColor}`}>{assistant.alignmentScore}<span className="text-xs text-muted-foreground font-normal">/100</span></span>
                  </div>
                  <ScoreBar score={assistant.alignmentScore} />
                </div>
              </div>
            </div>

            <div className="hidden sm:grid grid-cols-3 gap-3 text-center shrink-0 ml-2">
              <div>
                <div className="text-base font-bold">{assistant.callsThisWeek}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">Calls</div>
              </div>
              <div>
                <div className="text-base font-bold text-green-600">{assistant.handledAutonomously}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">Handled</div>
              </div>
              <div>
                <div className="text-base font-bold text-primary">{assistant.escalatedToVedant}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">Escalated</div>
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
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Where they sound like Vedant</h4>
                    <ul className="space-y-1.5">
                      {assistant.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
                      Where they diverge
                      <AIBadge tip="AI identifies the specific moments where this assistant's approach diverges from Vedant's — not generic best practice, but Vedant's actual language patterns." />
                    </h4>
                    {assistant.gaps.length === 0 ? (
                      <p className="text-xs text-green-600 flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> No divergence identified this week</p>
                    ) : (
                      <ul className="space-y-1.5">
                        {assistant.gaps.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs">
                            <XCircle className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{g}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Routine work handled independently</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {assistant.routineHandled.map(r => (
                      <Badge key={r} variant="outline" className="text-[10px] bg-card/50">{r}</Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5" /> This Week's Alignment Focus
                    <AIBadge tip="One specific, actionable focus derived from this week's call patterns — not a general tip but the exact behaviour gap to close." />
                  </h4>
                  <p className="text-xs text-foreground/80 leading-relaxed">{assistant.weeklyFocus}</p>
                </div>

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
              Team Alignment
              <AIBadge size="md" tip="AI captures every call made by Vedant's team, scores each one against Vedant's own approach, and surfaces the exact divergences each week." />
            </h1>
            <p className="text-muted-foreground mt-1">
              Vedant's 5 assistants, aligned to handle the routine 80% — his way.
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

      {/* Vedant — the source */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="bg-card/60 border-primary/30">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary shrink-0">VP</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-lg">Vedant Patel</span>
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">Selling Principal — Source of Truth</Badge>
                  <AIBadge tip="Vedant's call patterns are the benchmark. The AI learns from his actual calls — his specific language, his discovery sequence, his urgency framing — not a generic template." />
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  His approach is the playbook. Every assistant is measured against how closely they replicate what Vedant does naturally.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground text-xs">{DIGEST.week}:</span>
                  <span className="font-medium">{VEDANT.callsThisWeek} calls</span>
                  <span className="text-green-600 font-medium">{VEDANT.listingsWon} listings won</span>
                  <span className="text-muted-foreground">{VEDANT.conversionRate}% conversion</span>
                </div>
              </div>
              <button
                onClick={() => setShowPlaybook(!showPlaybook)}
                className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                {showPlaybook ? "Hide" : "View"} Vedant's signature approaches
                {showPlaybook ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            <AnimatePresence>
              {showPlaybook && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 border-t border-border/50 pt-4">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">5 things Vedant does on every call — what the AI teaches the team to replicate:</p>
                    <ul className="space-y-2">
                      {VEDANT.signatureApproaches.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <span className="h-4 w-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-foreground/80">{a}</span>
                        </li>
                      ))}
                    </ul>
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
                  <AIBadge tip="Delivered to Vedant every Monday at 7am. Not a HR report — a principal's view of how well his approach is being carried through by his team." />
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
                      <div className="text-[10px] text-muted-foreground">Team alignment</div>
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

                  {/* Time saved */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-600 mb-1.5 flex items-center gap-1.5">
                      <Award className="h-4 w-4" /> Your team freed up your week
                      <AIBadge tip="AI tracks which calls were handled to completion by assistants vs escalated, and calculates time returned to Vedant." />
                    </h4>
                    <p className="text-sm text-foreground/80">{DIGEST.vedantTimeSaved}</p>
                  </div>

                  {/* Top insight */}
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                      <Star className="h-4 w-4" /> Best alignment moment this week
                    </h4>
                    <p className="text-sm text-foreground/80">{DIGEST.topInsight}</p>
                  </div>

                  {/* Next gap */}
                  <div className="bg-muted/30 border border-border/40 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Next milestone: </span>
                      <span className="text-sm text-foreground/80">{DIGEST.nextGap}</span>
                    </div>
                  </div>

                  {/* Alignment trend */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Team alignment trend — last 6 weeks</p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {DIGEST.alignmentTrend.map((score, i) => (
                        <div key={i} className="text-center">
                          <div className="bg-muted/50 rounded h-14 flex items-end justify-center p-1 mb-1">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${(score / 100) * 46}px` }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                              className={`w-full rounded-sm ${i === DIGEST.alignmentTrend.length - 1 ? "bg-primary" : "bg-primary/30"}`}
                            />
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium">{score}</div>
                          <span className="text-[9px] text-muted-foreground/60">{["W47", "W48", "W49", "W50", "W51", "W52"][i]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 mt-2">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Team alignment up 16 points over 6 weeks — trajectory is on track
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
          <Users className="h-4 w-4" />
          Vedant's 5 Assistants — click to expand
        </h2>
        <div className="space-y-3">
          {ASSISTANTS.map((assistant, i) => (
            <AssistantCard key={assistant.id} assistant={assistant} index={i} />
          ))}
        </div>
      </div>

      {/* How it works — with silent signal */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Card className="bg-muted/15 border-border/30">
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> How alignment works
              <AIBadge tip="The AI model is built on Vedant's own calls — not an off-the-shelf real estate template. This means it captures his specific language, not generic industry best practice." />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "01", label: "Capture", icon: Mic, desc: "Every call by Vedant and his assistants is recorded, transcribed, and stored. All with consent and full privacy controls." },
                { step: "02", label: "Learn", icon: Brain, desc: "AI builds Vedant's specific playbook from his calls — his discovery sequence, his urgency language, his objection responses. Not a template — his actual patterns." },
                { step: "03", label: "Align", icon: ShieldCheck, desc: "Each assistant gets a weekly focus: one specific divergence to close. Vedant gets a Monday view of where his approach is landing — and where to step in." },
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
            <div className="border-t border-border/40 pt-3 flex items-start gap-2">
              <Layers className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                The same model works for any principal-assistant relationship — or any team where a consistent approach needs to scale.
                Once the source playbook is captured, alignment can extend to any group.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
