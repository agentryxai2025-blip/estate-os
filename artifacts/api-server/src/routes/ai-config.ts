import { Router } from "express";
import { mockAiProviders, mockAiTaskAssignments } from "./mock-data";

const router = Router();

router.get("/ai-config/providers", (req, res) => {
  res.json(mockAiProviders);
});

router.get("/ai-config/tasks", (req, res) => {
  res.json(mockAiTaskAssignments);
});

router.get("/ai-config/spend", (req, res) => {
  const dailySpend = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().slice(0, 10);
    const base = 38 + Math.sin(i * 0.4) * 12 + Math.random() * 8;
    dailySpend.push({ date: dateStr, amount: Math.round(base * 100) / 100 });
  }

  res.json({
    totalThisMonth: 1237.40,
    budget: 5000,
    spendByTask: [
      { task: "Vendor Email Draft", spend: 532.80, calls: 2960 },
      { task: "Maintenance Triage", spend: 298.40, calls: 7460 },
      { task: "Churn Explanations", spend: 184.20, calls: 3684 },
      { task: "Lease Parsing", spend: 142.60, calls: 1097 },
      { task: "Vector Embeddings", spend: 52.20, calls: 52200 },
      { task: "Suburb Content", spend: 27.20, calls: 302 },
    ],
    spendByProvider: [
      { provider: "Anthropic", spend: 892.40 },
      { provider: "Azure OpenAI (AU East)", spend: 210.80 },
      { provider: "OpenAI", spend: 134.20 },
    ],
    dailySpend,
  });
});

export default router;
