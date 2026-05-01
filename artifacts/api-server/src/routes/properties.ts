import { Router } from "express";
import { mockProperties } from "./mock-data";

const router = Router();

router.get("/properties", (req, res) => {
  const { status, type } = req.query;
  let results = [...mockProperties];
  if (status) results = results.filter(p => p.status === status);
  if (type) results = results.filter(p => p.type === type);
  res.json(results);
});

router.get("/properties/:id", (req, res) => {
  const property = mockProperties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ error: "Not found" });
  res.json({
    ...property,
    leaseHistory: [
      { tenantName: "David Morris", start: "2020-03-01", end: "2022-03-01", weeklyRent: property.weeklyRent * 0.82 },
      { tenantName: "Current Tenant", start: "2022-03-15", end: null, weeklyRent: property.weeklyRent },
    ],
    maintenanceHistory: [
      { category: "Plumbing", description: "Tap replacement", cost: 180, resolvedAt: "2024-06-15" },
      { category: "Cosmetic", description: "Touch-up painting", cost: 420, resolvedAt: "2024-09-22" },
    ],
    landlordNotes: "Owner prefers email communication. Auto-approve maintenance under $300. Annual rent review in March.",
  });
});

export default router;
