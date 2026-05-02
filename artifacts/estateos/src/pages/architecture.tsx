import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Globe, Users, FileCheck, Brain, Zap, Shield, BarChart3, Bell, Workflow, ArrowRight, CheckCircle2, Building2, Mail, Wrench, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const VERTICALS = [
  {
    id: "pm",
    label: "Property\nManagement",
    icon: Building2,
    color: "blue",
    colorCss: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-500",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      line: "#3b82f6",
      badge: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    },
    systems: ["MRI Vault", "PropertyMe"],
    systemDesc: "Existing PM software — lease data, rent rolls, tenancy records",
    valueAdded: [
      { icon: Brain, text: "AI maintenance triage — auto-priority & vendor match" },
      { icon: Bell, text: "Proactive rent arrears alerts before they escalate" },
      { icon: BarChart3, text: "Real-time rent roll analytics & vacancy forecasting" },
    ],
    tagline: "Turns raw PM data into proactive portfolio intelligence",
  },
  {
    id: "listings",
    label: "Sales &\nListings",
    icon: Globe,
    color: "violet",
    colorCss: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      text: "text-violet-500",
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      line: "#8b5cf6",
      badge: "bg-violet-500/20 text-violet-500 border-violet-500/30",
    },
    systems: ["REA Group", "Domain"],
    systemDesc: "Portal platforms — listing views, enquiries, inspection data",
    valueAdded: [
      { icon: Zap, text: "AI-drafted weekly vendor campaign updates" },
      { icon: BarChart3, text: "Enquiry & inspection trend analytics per listing" },
      { icon: Brain, text: "AI pricing strategy — hold, reduce, or auction advice" },
    ],
    tagline: "Converts portal activity into automated vendor communication",
  },
  {
    id: "crm",
    label: "Client\nRelationships",
    icon: Users,
    color: "orange",
    colorCss: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      text: "text-orange-500",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
      line: "#f97316",
      badge: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    },
    systems: ["Eagle CRM", "Proptech Group"],
    systemDesc: "CRM tools — contact records, call logs, communication history",
    valueAdded: [
      { icon: Brain, text: "AI churn risk scoring — 0–100 per landlord" },
      { icon: Bell, text: "Overdue contact alerts with AI-drafted outreach" },
      { icon: Shield, text: "Retention intervention recommendations by BDM priority" },
    ],
    tagline: "Predicts landlord churn before it shows up in a resignation letter",
  },
  {
    id: "compliance",
    label: "Compliance\n& Finance",
    icon: FileCheck,
    color: "emerald",
    colorCss: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-600",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      line: "#10b981",
      badge: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
    },
    systems: ["Trust Accounting", "Lease Documents"],
    systemDesc: "Legal & financial records — leases, bond, disbursements, audits",
    valueAdded: [
      { icon: Brain, text: "AI lease parsing — key dates & obligations extracted" },
      { icon: Shield, text: "Compliance status tracking with expiry alerts" },
      { icon: FileCheck, text: "Immutable AI audit log — every action traceable" },
    ],
    tagline: "Adds a compliance intelligence layer across all documents",
  },
];

const AI_CAPABILITIES = [
  { icon: Brain, label: "AI Orchestration", desc: "Routes tasks to the right model" },
  { icon: Workflow, label: "Workflow Engine", desc: "Automates approvals & actions" },
  { icon: BarChart3, label: "Unified Analytics", desc: "Cross-system dashboards" },
  { icon: Bell, label: "Smart Alerts", desc: "Proactive, not reactive" },
  { icon: Shield, label: "Audit & Compliance", desc: "Full traceability layer" },
  { icon: Zap, label: "Human-in-Loop", desc: "You approve, AI executes" },
];

export default function Architecture() {
  const [activeVertical, setActiveVertical] = useState<string | null>(null);

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
            Platform Architecture
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">How EstateOS Creates Value</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          EstateOS is an <span className="text-foreground font-medium">AI intelligence layer</span> that sits above your existing systems —
          connecting, enriching, and automating across every vertical without replacing anything.
        </p>
      </motion.div>

      {/* "Not replacing — adding value" callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-5 py-4"
      >
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm text-foreground/80">
          <span className="font-semibold text-foreground">We don't replace MRI, PropertyMe, REA, Eagle CRM, or your trust accounting.</span>{" "}
          We connect to all of them via API, ingest their data in real-time, and add AI-powered automation, analytics, and alerts on top — so each system becomes smarter.
        </p>
      </motion.div>

      {/* Architecture Diagram */}
      <div className="relative space-y-0">
        {/* EstateOS Platform Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative z-10"
        >
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 p-6 shadow-[0_0_60px_rgba(var(--primary-rgb,59,130,246),0.15)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">EstateOS</h2>
                    <Badge className="bg-primary/20 text-primary border-primary/30">AI Intelligence Layer</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-0.5">TAG Real Estate — Unified platform across all 4 verticals</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-end">
                {AI_CAPABILITIES.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-center gap-1.5 bg-card/60 border border-border/50 rounded-lg px-2.5 py-1.5"
                  >
                    <cap.icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium whitespace-nowrap">{cap.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bidirectional connection zone */}
        <div className="relative">
          {/* Flow legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-8 pt-3 pb-1"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ChevronUp className="h-3 w-3" />
              <div className="w-8 h-px bg-muted-foreground/40" />
              <span>Raw data flows up</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
              <span>Intelligence flows down</span>
              <div className="w-8 h-px bg-primary/60" />
              <ChevronDown className="h-3 w-3 text-primary" />
            </div>
          </motion.div>

          {/* The two-lane connectors */}
          <div className="h-16 grid grid-cols-4 px-6 md:px-8">
            {VERTICALS.map((v, i) => (
              <div key={v.id} className="flex justify-center items-stretch">
                <div className="flex gap-3 items-stretch">

                  {/* ↑ Data lane — muted, flows upward */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ delay: 0.38 + i * 0.08, duration: 0.4 }}
                    style={{ originY: 0 }}
                    className="relative flex flex-col items-center"
                  >
                    <ChevronUp className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    <div className="w-px flex-1 relative overflow-hidden bg-muted-foreground/15">
                      <motion.div
                        className="absolute left-0 w-full rounded-full"
                        style={{ background: "hsl(var(--muted-foreground) / 0.5)", height: "35%" }}
                        animate={{ bottom: ["0%", "110%"] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.25 }}
                      />
                    </div>
                  </motion.div>

                  {/* ↓ Intelligence lane — coloured, flows downward */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ delay: 0.44 + i * 0.08, duration: 0.4 }}
                    style={{ originY: 0 }}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className="w-px flex-1 relative overflow-hidden"
                      style={{ background: `${v.colorCss.line}25` }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 w-full rounded-full"
                        style={{ background: v.colorCss.line, height: "35%", boxShadow: `0 0 6px ${v.colorCss.line}` }}
                        animate={{ top: ["0%", "110%"] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.25 + 0.8 }}
                      />
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: v.colorCss.line }} />
                  </motion.div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Vertical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {VERTICALS.map((v, i) => {
            const isActive = activeVertical === v.id;
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                onClick={() => setActiveVertical(isActive ? null : v.id)}
                className="cursor-pointer"
              >
                <Card
                  className={`h-full border transition-all duration-300 ${v.colorCss.border} ${v.colorCss.bg} ${isActive ? v.colorCss.glow : ''} hover:${v.colorCss.glow}`}
                >
                  <CardContent className="p-5 space-y-4">
                    {/* Vertical header */}
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${v.colorCss.bg} ${v.colorCss.border}`}>
                        <Icon className={`h-5 w-5 ${v.colorCss.text}`} />
                      </div>
                      <h3 className={`font-bold text-sm leading-tight ${v.colorCss.text}`} style={{ whiteSpace: 'pre-line' }}>
                        {v.label}
                      </h3>
                    </div>

                    {/* Existing systems */}
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Existing Systems</p>
                      <div className="flex flex-wrap gap-1.5">
                        {v.systems.map(s => (
                          <Badge key={s} variant="outline" className={`text-[10px] py-0.5 ${v.colorCss.badge}`}>{s}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{v.systemDesc}</p>
                    </div>

                    {/* Divider with "EstateOS adds ↓" */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px" style={{ background: `${v.colorCss.line}40` }} />
                      <span className="text-[10px] font-semibold" style={{ color: v.colorCss.line }}>EstateOS adds</span>
                      <div className="flex-1 h-px" style={{ background: `${v.colorCss.line}40` }} />
                    </div>

                    {/* Value added */}
                    <div className="space-y-2.5">
                      {v.valueAdded.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 + idx * 0.07 }}
                          className="flex items-start gap-2"
                        >
                          <div className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${v.colorCss.bg} border ${v.colorCss.border}`}>
                            <item.icon className={`h-3 w-3 ${v.colorCss.text}`} />
                          </div>
                          <p className="text-xs text-foreground/80 leading-snug">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tagline */}
                    <p className={`text-[10px] italic leading-relaxed pt-1 border-t ${v.colorCss.border} ${v.colorCss.text} opacity-80`}>
                      "{v.tagline}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Existing systems layer label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center gap-3"
        >
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-xs text-muted-foreground px-2">↑ Existing systems remain unchanged ↑</span>
          <div className="flex-1 h-px bg-border/40" />
        </motion.div>
      </div>

      {/* Value Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold tracking-tight">What This Means for TAG Real Estate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "One Platform, All Data",
              desc: "Every system's data flows into a single command centre. No more tab-switching, no more siloed views — your whole portfolio in one place.",
              color: "text-primary",
              bg: "bg-primary/5 border-primary/20",
            },
            {
              icon: Brain,
              title: "AI That Works With Humans",
              desc: "EstateOS never acts unilaterally. It drafts, suggests, and alerts — but every approval stays with your team. You're always in control.",
              color: "text-violet-500",
              bg: "bg-violet-500/5 border-violet-500/20",
            },
            {
              icon: Shield,
              title: "Zero Disruption",
              desc: "Your existing systems keep running exactly as they do. EstateOS reads and enriches — it never writes back without your approval.",
              color: "text-emerald-600",
              bg: "bg-emerald-500/5 border-emerald-500/20",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}
              className={`rounded-xl border p-5 space-y-3 ${item.bg}`}
            >
              <div className={`h-10 w-10 rounded-xl bg-card/60 border border-border/50 flex items-center justify-center`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data flow legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="rounded-xl border border-border/50 bg-card/30 p-5 space-y-3"
      >
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Flow</h3>
        <div className="flex flex-wrap gap-6">
          {[
            { icon: Database, label: "Ingestion", desc: "API + webhooks + scheduled CSV export", color: "text-blue-500" },
            { icon: Brain, label: "Processing", desc: "AI enrichment, classification, scoring", color: "text-violet-500" },
            { icon: Bell, label: "Action", desc: "Alerts, drafts, approvals triggered in EstateOS", color: "text-orange-500" },
            { icon: CheckCircle2, label: "Human Approval", desc: "PM or BDM confirms before any output is sent", color: "text-emerald-600" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-start gap-3 flex-1 min-w-[160px]">
              {i > 0 && <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-1 hidden md:block" />}
              <div className="flex items-start gap-2">
                <step.icon className={`h-4 w-4 ${step.color} shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
