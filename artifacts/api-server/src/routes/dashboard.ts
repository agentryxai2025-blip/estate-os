import { Router } from "express";

const router = Router();

router.get("/dashboard/summary", (req, res) => {
  res.json({
    totalProperties: 12,
    activeLeases: 7,
    openMaintenance: 5,
    pendingApprovals: 3,
    rentRollValue: 11560,
    arrearsCount: 2,
    vacancyRate: 16.7,
    aiDraftsToday: 4,
    landlordChurnRisk: 2,
    monthlyRevenue: 184960,
  });
});

router.get("/dashboard/activity", (req, res) => {
  res.json([
    { id: "a1", type: "maintenance", title: "P1 Emergency — Electrical Outage", description: "3/22 Pacific Hwy, Neutral Bay — Priya Sharma reported full power loss. AI triaged and escalated.", timestamp: new Date(Date.now() - 23 * 60 * 1000).toISOString(), status: "urgent", aiGenerated: true, urgent: true },
    { id: "a2", type: "campaign", title: "Vendor Email Draft Ready", description: "6 Hunters Road, Mosman — Week 4 update drafted by AI for Vedant Patel. Awaiting approval.", timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(), status: "pending", aiGenerated: true, urgent: false },
    { id: "a3", type: "maintenance", title: "Maintenance Approved", description: "12/5 Rangers Rd — Blocked drain dispatched to North Shore Plumbing. Owner notified via SMS.", timestamp: new Date(Date.now() - 58 * 60 * 1000).toISOString(), status: "completed", aiGenerated: true, urgent: false },
    { id: "a4", type: "churn", title: "Churn Risk Alert — Critical", description: "Helena & Tom Russo (2 properties) scored 91/100. Possible rent roll transfer. Principal review needed.", timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), status: "urgent", aiGenerated: true, urgent: true },
    { id: "a5", type: "lead", title: "New REA Enquiry", description: "4 Holt Ave, Mosman — Tom Robertson requested an inspection. Auto-assigned to Vedant Patel.", timestamp: new Date(Date.now() - 2.1 * 60 * 60 * 1000).toISOString(), status: "new", aiGenerated: false, urgent: false },
    { id: "a6", type: "lease", title: "Lease Expiry — 44 Days", description: "12/5 Rangers Rd, Cremorne Point — Aaron & Kelly Thompson lease expires 14 June. Renewal discussion needed.", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), status: "attention", aiGenerated: false, urgent: false },
    { id: "a7", type: "campaign", title: "Vendor Email Approved & Sent", description: "2 Botanic Road, Mosman — Hailey Drummond approved and sent Week 2 update to Christine Lawson.", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), status: "completed", aiGenerated: true, urgent: false },
    { id: "a8", type: "maintenance", title: "New Maintenance Request", description: "12/5 Rangers Rd — Ceiling crack reported by Aaron Thompson following heavy rain.", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), status: "pending", aiGenerated: false, urgent: false },
    { id: "a9", type: "data", title: "MRI Vault Export Received", description: "1,842 trust account records ingested successfully for April 2025.", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), status: "completed", aiGenerated: false, urgent: false },
    { id: "a10", type: "ai", title: "AI Churn Scores Updated", description: "Daily churn scoring completed. 3 landlords above threshold — 1 critical, 2 high.", timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), status: "completed", aiGenerated: true, urgent: false },
  ]);
});

router.get("/dashboard/charts", (req, res) => {
  res.json({
    rentCollectionByMonth: [
      { month: "Nov", collected: 164200, outstanding: 3800 },
      { month: "Dec", collected: 171400, outstanding: 2100 },
      { month: "Jan", collected: 168900, outstanding: 5200 },
      { month: "Feb", collected: 175300, outstanding: 1900 },
      { month: "Mar", collected: 179800, outstanding: 4300 },
      { month: "Apr", collected: 184960, outstanding: 2390 },
    ],
    maintenanceByCategory: [
      { category: "Plumbing", count: 14 },
      { category: "Electrical", count: 8 },
      { category: "HVAC", count: 6 },
      { category: "Structural", count: 3 },
      { category: "Cosmetic", count: 11 },
      { category: "Appliances", count: 5 },
    ],
    propertyStatusBreakdown: [
      { status: "Leased", count: 7 },
      { status: "Vacant", count: 2 },
      { status: "For Lease", count: 1 },
      { status: "For Sale", count: 2 },
    ],
    landlordChurnTrend: [
      { month: "Nov", atRisk: 3, saved: 2 },
      { month: "Dec", atRisk: 2, saved: 2 },
      { month: "Jan", atRisk: 4, saved: 3 },
      { month: "Feb", atRisk: 3, saved: 3 },
      { month: "Mar", atRisk: 5, saved: 3 },
      { month: "Apr", atRisk: 3, saved: 1 },
    ],
  });
});

export default router;
