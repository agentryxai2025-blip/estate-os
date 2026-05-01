import { Router } from "express";
import { mockTenants } from "./mock-data";

const router = Router();

router.get("/tenants", (req, res) => {
  const { status } = req.query;
  let results = [...mockTenants];
  if (status) results = results.filter(t => t.status === status);
  res.json(results);
});

router.get("/tenants/:id", (req, res) => {
  const tenant = mockTenants.find(t => t.id === req.params.id);
  if (!tenant) return res.status(404).json({ error: "Not found" });
  res.json({
    ...tenant,
    paymentHistory: [
      { date: "2025-04-28", amount: tenant.weeklyRent, status: "paid", method: "direct_debit" },
      { date: "2025-04-21", amount: tenant.weeklyRent, status: "paid", method: "direct_debit" },
      { date: "2025-04-14", amount: tenant.weeklyRent, status: "paid", method: "direct_debit" },
      { date: "2025-04-07", amount: tenant.weeklyRent, status: "paid", method: "direct_debit" },
      { date: "2025-03-31", amount: tenant.weeklyRent, status: tenant.arrears > 0 ? "missed" : "paid", method: tenant.arrears > 0 ? null : "direct_debit" },
      { date: "2025-03-24", amount: tenant.weeklyRent, status: tenant.arrears > 0 ? "missed" : "paid", method: tenant.arrears > 0 ? null : "direct_debit" },
    ],
    maintenanceRequests: [
      { category: "Plumbing", description: "Blocked drain", submittedAt: "2025-04-10", status: "resolved" },
    ],
  });
});

export default router;
