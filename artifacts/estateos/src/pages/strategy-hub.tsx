import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIBadge } from "@/components/ai-badge";
import {
  TrendingUp, TrendingDown, Minus, Search, Lock, ChevronDown, ChevronUp,
  Lightbulb, AlertTriangle, BarChart3, Building2, MapPin, Sparkles,
  BookOpen, Brain, Eye, EyeOff
} from "lucide-react";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(v);

const SUBURB_BRIEFS = [
  {
    id: "mosman",
    suburb: "Mosman",
    month: "May 2026",
    medianSalePrice: 4200000,
    medianChange: -3.2,
    clearanceRate: 61,
    clearanceChange: -17,
    daysOnMarket: 34,
    domChange: +8,
    tagListings: 12,
    tagSold: 8,
    tagAvgDom: 22,
    rentalYield: 2.3,
    urgency: "amber" as const,
    strategy: "Hold — resist price drops for 3 more weeks",
    strategyNote: "Clearance rate fell from 78% to 61% over 6 weeks. The $3M–$4M bracket is softest right now. Tighten vendor guide conversations by 3–5%. Competing stock is up 12%. Prioritise mid-week opens to reduce auction day risk on B-grade stock.",
    keyInsight: "3 recent sales came in 4–6% below asking guide. Buyers are negotiating hard. Hold firm on quality homes but be realistic with vendors on secondary locations.",
    competitorActivity: "McGrath Mosman increased new listings by 22% this month. Their avg DOM is 41 days vs our 22.",
    recommendation: "At Monday meeting: align team on holding current guides. No price drops before week 5. Use McGrath's slower DOM as a listing win argument.",
  },
  {
    id: "neutral-bay",
    suburb: "Neutral Bay",
    month: "May 2026",
    medianSalePrice: 1240000,
    medianChange: +3.2,
    clearanceRate: 74,
    clearanceChange: +4,
    daysOnMarket: 29,
    domChange: -3,
    tagListings: 7,
    tagSold: 6,
    tagAvgDom: 24,
    rentalYield: 3.8,
    urgency: "green" as const,
    strategy: "Aggressive — push for more mandates",
    strategyNote: "2-bed apartments are moving fastest (avg 21 days). Clearance rate climbing. This is our strongest market right now. BDM should be targeting appraisals in this suburb aggressively — every unlisted property is an opportunity.",
    keyInsight: "Buyer demand for sub-$1.3M is outstripping supply. Vendors who list now will benefit from the current competition dynamic before winter softening.",
    competitorActivity: "LJ Hooker active with 3 new listings this month. Our market share is 31% — highest across all suburbs.",
    recommendation: "Identify 5 off-market appraisal opportunities in the $900K–$1.3M apartment segment. Target owners who bought 8–12 years ago — likely significant capital gain motivation.",
  },
  {
    id: "cremorne",
    suburb: "Cremorne",
    month: "May 2026",
    medianSalePrice: 1850000,
    medianChange: -1.1,
    clearanceRate: 67,
    clearanceChange: -6,
    daysOnMarket: 38,
    domChange: +5,
    tagListings: 9,
    tagSold: 5,
    tagAvgDom: 31,
    rentalYield: 3.1,
    urgency: "amber" as const,
    strategy: "Selective — quality over volume",
    strategyNote: "Supply up 12%, McGrath expanding aggressively. Our DOM has increased 5 days this month. Recommend being selective on listings — don't take overpriced mandates that will sit and damage our average DOM stats.",
    keyInsight: "Properties between $1.5M–$2.2M are taking longest. Below $1.2M and above $2.5M are still moving well. The middle bracket has buyer hesitation.",
    competitorActivity: "McGrath Cremorne opened a new office in April — monitoring closely. They have 4 new agents and appear to be pricing listings aggressively to win mandates.",
    recommendation: "At vendor presentations: lead with our DOM advantage (31 days vs suburb avg 38). Don't match competitor pricing — defend our track record with data.",
  },
  {
    id: "cremorne-point",
    suburb: "Cremorne Point",
    month: "May 2026",
    medianSalePrice: 4750000,
    medianChange: +1.8,
    clearanceRate: 78,
    clearanceChange: +2,
    daysOnMarket: 26,
    domChange: -2,
    tagListings: 4,
    tagSold: 4,
    tagAvgDom: 19,
    rentalYield: 2.1,
    urgency: "green" as const,
    strategy: "Maintain — premium market holding firm",
    strategyNote: "This is our most stable suburb. $4M+ market showing resilience despite broader softening. Buyers are highly motivated and pre-approved. No strategy changes needed — focus on maintaining service quality.",
    keyInsight: "Water-view premium has increased to 18% above non-view equivalents (was 14% last year). If any client has a water-view property, that's a strong narrative.",
    competitorActivity: "Low competitor activity — only 2 active competitor listings this month. Our market share here is exceptional.",
    recommendation: "Focus Cremorne Point effort on off-market introductions. Buyers in this bracket prefer discretion — no need for aggressive public marketing.",
  },
  {
    id: "kirribilli",
    suburb: "Kirribilli",
    month: "May 2026",
    medianSalePrice: 1020000,
    medianChange: -4.8,
    clearanceRate: 54,
    clearanceChange: -14,
    daysOnMarket: 52,
    domChange: +18,
    tagListings: 3,
    tagSold: 1,
    tagAvgDom: 48,
    rentalYield: 3.6,
    urgency: "red" as const,
    strategy: "Caution — advise vendors honestly",
    strategyNote: "Significant oversupply in the $800K–$1.1M apartment bracket. 18 additional days on market compared to last month. Vendors need honest conversations — this is not the time to list at aspirational prices. Risk: vendors who list now at inflated prices will damage our stats.",
    keyInsight: "18 active listings competing in a pool of roughly 12 active buyers. Unless a property has a point of difference (view, renovation, parking), expect 45+ days and vendor price reductions.",
    competitorActivity: "Ray White and Domain Residential both have high stock levels. Market is saturated — competitor discounting visible.",
    recommendation: "Decline overpriced mandates in Kirribilli until the supply/demand balance improves (estimate 6–8 weeks). Be honest with clients: better to wait than to have a stale listing.",
  },
];

const KB_QA = [
  {
    id: "q1",
    question: "Has anyone sold a 4-bed house in Mosman under $4M in the last 90 days?",
    category: "Recent Sales",
    answer: "Yes — 3 comparable sales in the last 90 days:\n\n• **22 Bradleys Head Rd, Mosman** — $3.85M, 41 days on market (competitor, Ray White)\n• **7 Silex Rd, Mosman** — $3.92M, 28 days on market (competitor, McGrath)\n• **14 Harbour View Tce, Mosman** — $3.78M, 22 days on market **(TAG — Vedant Patel)**\n\nTAG's sale was the fastest by 6 days and achieved $70K above the median for this configuration. The two competitor sales both required vendor price reductions of 3–5% before exchange.",
    sources: ["CoreLogic RP Data", "TAG internal records"],
    confidence: 96,
  },
  {
    id: "q2",
    question: "What is the median price for a 2-bed apartment in Neutral Bay vs Cremorne?",
    category: "Market Comparison",
    answer: "Current median comparison (May 2026):\n\n• **Neutral Bay 2-bed apartment** — $1.24M median | 29 days on market | 74% clearance rate ↑\n• **Cremorne 2-bed apartment** — $1.18M median | 38 days on market | 67% clearance rate ↓\n\nNeutral Bay is commanding a 5.1% premium over Cremorne for this configuration. Buyer demand in Neutral Bay is outpacing supply — properties receiving multiple offers. Cremorne 2-beds are slower due to increased competitor supply this quarter.",
    sources: ["CoreLogic RP Data", "REA Group", "Domain"],
    confidence: 94,
  },
  {
    id: "q3",
    question: "What objection should I expect from a vendor at $2.8M in Cremorne Point?",
    category: "Listing Preparation",
    answer: "Based on recent Cremorne Point appraisals and call transcripts, the most common objections at this price point:\n\n**1. \"My neighbour got $3.1M\"** (67% of cases)\nResponse: That sale was 14 months ago when clearance rates were 82% vs 78% today. The market is stable but not accelerating. We price to sell, not to sit.\n\n**2. \"I want to try it at $3M first\"** (41% of cases)\nResponse: Overpriced listings in this suburb currently average 48 days. Correctly priced homes sell in 19 days. Buyers in the $2.8M–$3M bracket are well-researched — they'll pass on a property that's above comparables.\n\n**3. \"Another agent quoted higher\"** (29% of cases)\nResponse: Our average DOM in Cremorne Point is 19 days vs the suburb median of 26. We price to maximise net proceeds, not to win the mandate.",
    sources: ["TAG call transcripts (Wedge 8)", "TAG internal CRM notes"],
    confidence: 88,
  },
  {
    id: "q4",
    question: "Which competitor agencies are most active in Cremorne this month?",
    category: "Competitive Intelligence",
    answer: "Competitor activity in Cremorne — May 2026:\n\n• **McGrath Cremorne** — 11 active listings (↑ from 7 last month). New office opened April 2026. Avg guide price appears 2–3% above market — likely using aggressive pricing to win mandates.\n• **LJ Hooker Mosman** — 4 active listings, extending their territory south.\n• **Ray White Lower North Shore** — 3 active listings, flat month-on-month.\n\n**TAG Cremorne** — 9 active listings, avg DOM 31 days vs McGrath's 41 days. Our sale conversion is 56% vs McGrath's estimated 44%.\n\n**Strategic note:** McGrath's pricing aggression is creating overpriced listings that fail — use their stale listings as a counter-argument in your listing presentations.",
    sources: ["REA Group listing data", "Domain listing data"],
    confidence: 91,
  },
  {
    id: "q5",
    question: "What is the average rental yield for a 3-bed house in Mosman right now?",
    category: "Rental Market",
    answer: "Rental yields for 3-bed houses in Mosman — May 2026:\n\n• **Gross rental yield:** 2.4% (median sale $3.2M, median rent $1,480/w)\n• **Net rental yield (est.):** 1.8–2.0% after management fees, maintenance, and vacancy\n• **Vacancy rate:** 1.8% (tight — good for landlords)\n• **Rent growth (12 months):** +4.2%\n\n**TAG portfolio comparison:** Our managed 3-bed Mosman houses are achieving $1,520/w average — 2.7% above the suburb median rent. Our vacancy periods average 8 days vs suburb median of 14 days.\n\nThis data is useful for landlords comparing PM agencies — our rent achievement and vacancy performance is meaningfully better than the suburb average.",
    sources: ["CoreLogic RP Data", "TAG PropertyMe data"],
    confidence: 93,
  },
];

const SUGGESTED_QUESTIONS = [
  "Has anyone sold a 4-bed house in Mosman under $4M in the last 90 days?",
  "What is the median price for a 2-bed apartment in Neutral Bay vs Cremorne?",
  "What objection should I expect from a vendor at $2.8M in Cremorne Point?",
  "Which competitor agencies are most active in Cremorne this month?",
  "What is the average rental yield for a 3-bed house in Mosman right now?",
];

const urgencyConfig = {
  green: { label: "On Track", cls: "bg-green-500/10 text-green-600 border-green-500/20", bar: "bg-green-500" },
  amber: { label: "Watch", cls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", bar: "bg-yellow-500" },
  red: { label: "Caution", cls: "bg-destructive/10 text-destructive border-destructive/20", bar: "bg-destructive" },
};

function TrendIcon({ change, suffix = "%" }: { change: number; suffix?: string }) {
  if (change > 0) return <span className="flex items-center gap-0.5 text-green-600 text-xs font-medium"><TrendingUp className="h-3 w-3" />+{change}{suffix}</span>;
  if (change < 0) return <span className="flex items-center gap-0.5 text-destructive text-xs font-medium"><TrendingDown className="h-3 w-3" />{change}{suffix}</span>;
  return <span className="flex items-center gap-0.5 text-muted-foreground text-xs"><Minus className="h-3 w-3" />flat</span>;
}

function SuburbCard({ brief, index }: { brief: typeof SUBURB_BRIEFS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showCompetitor, setShowCompetitor] = useState(false);
  const cfg = urgencyConfig[brief.urgency];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
      <Card className={`bg-card/50 border-border/50 overflow-hidden ${brief.urgency === "red" ? "border-destructive/30" : brief.urgency === "amber" ? "border-yellow-500/20" : ""}`}>
        <div className={`h-1 w-full ${cfg.bar}`} />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">{brief.suburb}</CardTitle>
              <Badge variant="outline" className="text-[10px]">{brief.month}</Badge>
            </div>
            <Badge variant="outline" className={`text-xs ${cfg.cls}`}>{cfg.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Median Sale</div>
              <div className="font-bold text-sm">{formatCurrency(brief.medianSalePrice)}</div>
              <TrendIcon change={brief.medianChange} />
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Clearance</div>
              <div className="font-bold text-sm">{brief.clearanceRate}%</div>
              <TrendIcon change={brief.clearanceChange} />
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Avg DOM</div>
              <div className="font-bold text-sm">{brief.daysOnMarket}d</div>
              <TrendIcon change={brief.domChange} suffix="d" />
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">TAG Avg DOM</div>
              <div className="font-bold text-sm text-primary">{brief.tagAvgDom}d</div>
              <span className="text-xs text-primary font-medium">{brief.tagSold}/{brief.tagListings} sold</span>
            </div>
          </div>

          {/* Strategy recommendation */}
          <div className={`rounded-lg border p-3 ${brief.urgency === "red" ? "bg-destructive/5 border-destructive/20" : brief.urgency === "amber" ? "bg-yellow-500/5 border-yellow-500/20" : "bg-green-500/5 border-green-500/20"}`}>
            <div className="flex items-start gap-2">
              <Lightbulb className={`h-4 w-4 mt-0.5 shrink-0 ${brief.urgency === "red" ? "text-destructive" : brief.urgency === "amber" ? "text-yellow-600" : "text-green-600"}`} />
              <div>
                <div className={`text-xs font-semibold mb-1 flex items-center gap-1.5 ${brief.urgency === "red" ? "text-destructive" : brief.urgency === "amber" ? "text-yellow-600" : "text-green-600"}`}>
                  Strategy: {brief.strategy}
                  <AIBadge tip="AI generates this strategy recommendation by combining your portfolio performance with suburb-level market data from CoreLogic and REA." />
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{brief.strategyNote}</p>
              </div>
            </div>
          </div>

          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
              {/* Key insight */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                  <Brain className="h-3.5 w-3.5" /> Key Insight
                  <AIBadge tip="Internal insight — combines TAG's own transaction history with public market data to surface patterns unavailable to competitors." />
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{brief.keyInsight}</p>
              </div>

              {/* Competitive intelligence */}
              <div className="bg-muted/30 border border-border/50 rounded-lg p-3">
                <button
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground w-full text-left"
                  onClick={() => setShowCompetitor(!showCompetitor)}
                >
                  {showCompetitor ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  Competitive Intelligence
                  <Lock className="h-3 w-3 ml-auto text-muted-foreground/50" />
                </button>
                {showCompetitor && (
                  <p className="text-xs text-foreground/70 leading-relaxed mt-2 border-t border-border/50 pt-2">{brief.competitorActivity}</p>
                )}
              </div>

              {/* Team recommendation */}
              <div className="bg-card border border-border/80 rounded-lg p-3">
                <div className="text-xs font-semibold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-500" /> Monday Meeting Recommendation
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{brief.recommendation}</p>
              </div>
            </motion.div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-full h-7 text-xs text-muted-foreground"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <><ChevronUp className="h-3.5 w-3.5 mr-1" /> Hide full brief</> : <><ChevronDown className="h-3.5 w-3.5 mr-1" /> Read full brief + competitive intelligence</>}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function KnowledgeBase() {
  const [query, setQuery] = useState("");
  const [activeQA, setActiveQA] = useState<typeof KB_QA[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = (q: string) => {
    setQuery(q);
    setLoading(true);
    setActiveQA(null);
    setTimeout(() => {
      const match = KB_QA.find(qa => qa.question === q) || KB_QA[0];
      setActiveQA(match);
      setLoading(false);
    }, 900);
  };

  const formatAnswer = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold text-foreground mt-2">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.startsWith("• ")) {
        const parts = line.substring(2).split("**");
        return (
          <p key={i} className="flex gap-1.5 mt-1 text-foreground/80">
            <span className="text-primary mt-0.5 shrink-0">•</span>
            <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</span>
          </p>
        );
      }
      if (line === "") return <div key={i} className="h-1" />;
      const parts = line.split("**");
      return <p key={i} className="text-foreground/80 mt-1">{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
        <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium">Internal Knowledge Base — TAG Staff Only</p>
          <p className="text-xs text-muted-foreground mt-0.5">Combines CoreLogic, REA/Domain, and TAG's own transaction history. Not for client distribution.</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ask anything about the market…"
          className="pl-9 pr-24 bg-card/50 h-11"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && query.trim() && handleQuery(query)}
        />
        <Button size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8" onClick={() => query.trim() && handleQuery(query)}>
          Ask
        </Button>
      </div>

      {/* Suggested questions */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Suggested Questions</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => handleQuery(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-border/60 bg-card/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors text-muted-foreground text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-muted-foreground text-sm py-6">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="h-2 w-2 rounded-full bg-primary" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </div>
          Querying TAG knowledge base…
        </motion.div>
      )}

      {/* Answer */}
      <AnimatePresence>
        {activeQA && !loading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="bg-card/60 border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">{activeQA.category}</p>
                    <p className="text-sm font-semibold text-foreground">{activeQA.question}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-600 shrink-0">
                    {activeQA.confidence}% confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm leading-relaxed space-y-0.5">
                  {formatAnswer(activeQA.answer)}
                </div>
                <div className="pt-3 border-t border-border/50 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Sources:</span>
                  {activeQA.sources.map(s => (
                    <Badge key={s} variant="outline" className="text-[10px] bg-muted/30">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Q&A history */}
      {!activeQA && !loading && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Recent Team Queries</p>
          {KB_QA.slice(0, 3).map((qa, i) => (
            <motion.button
              key={qa.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleQuery(qa.question)}
              className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:bg-card/80 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{qa.question}</span>
                <Badge variant="outline" className="ml-auto text-[10px] shrink-0">{qa.category}</Badge>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StrategyHub() {
  const [tab, setTab] = useState<"briefs" | "kb">("briefs");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">TAG Strategy Hub</h1>
            <AIBadge size="md" tip="Combines public market data (CoreLogic, REA, Domain) with TAG's own portfolio history to generate internal intelligence unavailable to any competitor." />
            <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-500 bg-orange-500/5">
              <Lock className="h-2.5 w-2.5 mr-1" /> Internal Only
            </Badge>
          </div>
          <p className="text-muted-foreground">Monthly market briefings, strategy recommendations, and the TAG knowledge base.</p>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5 self-start mt-1">
          <BarChart3 className="h-3.5 w-3.5" />
          Updated: May 1, 2026
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 border border-border/50 rounded-lg p-1 w-fit">
        {([["briefs", "Suburb Briefings", Building2], ["kb", "Knowledge Base", BookOpen]] as const).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === key ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {key === "kb" && <AIBadge tip="AI answers natural-language questions using a private knowledge base built from TAG's transactions and public market data." />}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "briefs" ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {SUBURB_BRIEFS.map((brief, i) => (
            <SuburbCard key={brief.id} brief={brief} index={i} />
          ))}
        </div>
      ) : (
        <KnowledgeBase />
      )}
    </div>
  );
}
