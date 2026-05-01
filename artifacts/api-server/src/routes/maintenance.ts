import { Router } from "express";
import { mockMaintenanceTickets } from "./mock-data";

const router = Router();

const tickets = [...mockMaintenanceTickets] as typeof mockMaintenanceTickets;

router.get("/maintenance", (req, res) => {
  const { priority, status } = req.query;
  let results = tickets.map(({ aiAnalysis, confidenceScore, suggestedVendors, ownerPreferences, draftOwnerSms, draftTenantAck, ...t }) => t);
  if (priority) results = results.filter(t => t.priority === priority);
  if (status) results = results.filter(t => t.status === status);
  res.json(results);
});

router.get("/maintenance/:id", (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "Not found" });
  res.json(ticket);
});

router.post("/maintenance/:id/approve", (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "Not found" });
  ticket.pendingApproval = false;
  ticket.status = "approved";
  res.json({ success: true, message: "Action approved. Vendor notified and owner SMS sent.", timestamp: new Date().toISOString() });
});

export default router;
