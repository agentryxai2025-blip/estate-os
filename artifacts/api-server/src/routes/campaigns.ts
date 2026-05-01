import { Router } from "express";
import { mockCampaigns } from "./mock-data";

const router = Router();

const campaigns = [...mockCampaigns] as typeof mockCampaigns;

router.get("/campaigns", (req, res) => {
  const { status } = req.query;
  let results = campaigns.map(({ emailBody, emailSubject, confidenceScore, aiReasoning, priceRecommendation, comparables, ...c }) => c);
  if (status) results = results.filter(c => c.status === status);
  res.json(results);
});

router.get("/campaigns/:id", (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id);
  if (!campaign) return res.status(404).json({ error: "Not found" });
  res.json(campaign);
});

router.post("/campaigns/:id/approve", (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id);
  if (!campaign) return res.status(404).json({ error: "Not found" });
  campaign.draftStatus = "approved";
  const { editedSubject, editedBody } = req.body as { editedSubject?: string; editedBody?: string };
  if (editedSubject) campaign.emailSubject = editedSubject;
  if (editedBody) campaign.emailBody = editedBody;
  res.json({ success: true, message: "Draft approved and queued for send. Vendor will receive email within 5 minutes.", timestamp: new Date().toISOString() });
});

export default router;
