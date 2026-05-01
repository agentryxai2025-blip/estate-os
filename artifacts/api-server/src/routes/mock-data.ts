export const mockProperties = [
  { id: "p1", address: "14 Harbour View Tce", suburb: "Mosman", type: "House", status: "leased", weeklyRent: 1850, bedrooms: 4, bathrooms: 2, tenantName: "Sarah & James Whitfield", landlordName: "Michael Chen", leaseExpiry: "2025-08-15", maintenanceOpen: 1, imageUrl: "" },
  { id: "p2", address: "3/22 Pacific Highway", suburb: "Neutral Bay", type: "Apartment", status: "leased", weeklyRent: 720, bedrooms: 2, bathrooms: 1, tenantName: "Priya Sharma", landlordName: "Linda Park", leaseExpiry: "2025-03-31", maintenanceOpen: 2, imageUrl: "" },
  { id: "p3", address: "88 Milson Road", suburb: "Cremorne", type: "Townhouse", status: "vacant", weeklyRent: 1200, bedrooms: 3, bathrooms: 2, tenantName: "", landlordName: "David Okafor", leaseExpiry: "", maintenanceOpen: 0, imageUrl: "" },
  { id: "p4", address: "51 Holt Avenue", suburb: "Mosman", type: "House", status: "for-lease", weeklyRent: 2200, bedrooms: 5, bathrooms: 3, tenantName: "", landlordName: "Helena & Tom Russo", leaseExpiry: "", maintenanceOpen: 0, imageUrl: "" },
  { id: "p5", address: "7/190 Military Road", suburb: "Cremorne", type: "Apartment", status: "leased", weeklyRent: 580, bedrooms: 1, bathrooms: 1, tenantName: "Oliver Nguyen", landlordName: "Fiona Walsh", leaseExpiry: "2025-11-30", maintenanceOpen: 0, imageUrl: "" },
  { id: "p6", address: "42 Raglan Street", suburb: "Mosman", type: "House", status: "for-sale", weeklyRent: 0, bedrooms: 4, bathrooms: 3, tenantName: "", landlordName: "Patricia Stanton", leaseExpiry: "", maintenanceOpen: 0, imageUrl: "" },
  { id: "p7", address: "12/5 Rangers Road", suburb: "Cremorne Point", type: "Apartment", status: "leased", weeklyRent: 950, bedrooms: 2, bathrooms: 2, tenantName: "Aaron & Kelly Thompson", landlordName: "James Li", leaseExpiry: "2025-06-14", maintenanceOpen: 3, imageUrl: "" },
  { id: "p8", address: "99 Spofforth Street", suburb: "Mosman", type: "House", status: "leased", weeklyRent: 2650, bedrooms: 5, bathrooms: 3, tenantName: "Claudia Barros", landlordName: "Raj Mehta", leaseExpiry: "2026-01-20", maintenanceOpen: 0, imageUrl: "" },
  { id: "p9", address: "3 Avenue Road", suburb: "Mosman", type: "House", status: "for-sale", weeklyRent: 0, bedrooms: 6, bathrooms: 4, tenantName: "", landlordName: "Genevieve Ford", leaseExpiry: "", maintenanceOpen: 0, imageUrl: "" },
  { id: "p10", address: "18/40 Kurraba Road", suburb: "Neutral Bay", type: "Apartment", status: "leased", weeklyRent: 650, bedrooms: 2, bathrooms: 1, tenantName: "Ethan Clarke", landlordName: "Sue & Peter Yang", leaseExpiry: "2025-09-01", maintenanceOpen: 1, imageUrl: "" },
  { id: "p11", address: "25 Cabramatta Road", suburb: "Mosman", type: "Townhouse", status: "vacant", weeklyRent: 1400, bedrooms: 3, bathrooms: 2, tenantName: "", landlordName: "Anna Kowalski", leaseExpiry: "", maintenanceOpen: 0, imageUrl: "" },
  { id: "p12", address: "8/33 Ben Boyd Road", suburb: "Neutral Bay", type: "Apartment", status: "leased", weeklyRent: 490, bedrooms: 1, bathrooms: 1, tenantName: "Marcus Johansson", landlordName: "Derek Holt", leaseExpiry: "2025-07-31", maintenanceOpen: 0, imageUrl: "" },
];

export const mockTenants = [
  { id: "t1", name: "Sarah & James Whitfield", email: "swhitfield@email.com", phone: "0412 345 678", propertyAddress: "14 Harbour View Tce, Mosman", leaseStart: "2023-08-15", leaseEnd: "2025-08-15", weeklyRent: 1850, arrears: 0, status: "current", avatarInitials: "SW" },
  { id: "t2", name: "Priya Sharma", email: "p.sharma@email.com", phone: "0498 765 432", propertyAddress: "3/22 Pacific Highway, Neutral Bay", leaseStart: "2023-03-31", leaseEnd: "2025-03-31", weeklyRent: 720, arrears: 1440, status: "arrears", avatarInitials: "PS" },
  { id: "t3", name: "Oliver Nguyen", email: "onguyen@email.com", phone: "0455 123 456", propertyAddress: "7/190 Military Road, Cremorne", leaseStart: "2024-11-30", leaseEnd: "2025-11-30", weeklyRent: 580, arrears: 0, status: "current", avatarInitials: "ON" },
  { id: "t4", name: "Aaron & Kelly Thompson", email: "a.thompson@email.com", phone: "0401 888 999", propertyAddress: "12/5 Rangers Road, Cremorne Point", leaseStart: "2024-06-14", leaseEnd: "2025-06-14", weeklyRent: 950, arrears: 950, status: "arrears", avatarInitials: "AT" },
  { id: "t5", name: "Claudia Barros", email: "claudia.b@email.com", phone: "0476 543 210", propertyAddress: "99 Spofforth Street, Mosman", leaseStart: "2024-01-20", leaseEnd: "2026-01-20", weeklyRent: 2650, arrears: 0, status: "current", avatarInitials: "CB" },
  { id: "t6", name: "Ethan Clarke", email: "e.clarke@email.com", phone: "0422 111 222", propertyAddress: "18/40 Kurraba Road, Neutral Bay", leaseStart: "2024-09-01", leaseEnd: "2025-09-01", weeklyRent: 650, arrears: 0, status: "current", avatarInitials: "EC" },
  { id: "t7", name: "Marcus Johansson", email: "m.johansson@email.com", phone: "0488 333 444", propertyAddress: "8/33 Ben Boyd Road, Neutral Bay", leaseStart: "2024-07-31", leaseEnd: "2025-07-31", weeklyRent: 490, arrears: 0, status: "current", avatarInitials: "MJ" },
];

export const mockMaintenanceTickets = [
  {
    id: "m1", propertyAddress: "12/5 Rangers Road, Cremorne Point", tenantName: "Aaron & Kelly Thompson",
    category: "Plumbing", description: "Kitchen sink drain completely blocked, water backing up. Standing water in sink for 2 days.", priority: "P2", status: "pending-approval", submittedAt: "2025-05-01T08:22:00Z", aiTriaged: true, estimatedCost: 280, suggestedAction: "Dispatch pre-approved plumber — confirm owner approval for under $300",
    pendingApproval: true,
    aiAnalysis: "Based on tenant description, this is a standard blocked drain (not a pipe collapse). Cross-referenced 3 similar issues at this property and comparable buildings — all resolved with hydro-jet clearing at $220–$310. Urgency: P2 (within 24h) as prolonged blockage risks overflow damage.",
    confidenceScore: 0.91, suggestedVendors: [{ name: "North Shore Plumbing Co.", rate: "$95/hr", preApproved: true }, { name: "Rapid Drain Solutions", rate: "$110/hr", preApproved: true }], ownerPreferences: "Auto-approve under $300. Preferred vendor: North Shore Plumbing.", draftOwnerSms: "Hi James, your tenant at 12/5 Rangers Rd has a blocked kitchen drain. AI estimated cost: $220–$280 (within your auto-approve limit). We're dispatching North Shore Plumbing. No action needed from you.", draftTenantAck: "Hi Aaron, thanks for reporting the blocked drain. We've arranged a plumber for tomorrow morning between 8–11am. You'll receive a confirmation SMS from North Shore Plumbing Co."
  },
  {
    id: "m2", propertyAddress: "3/22 Pacific Highway, Neutral Bay", tenantName: "Priya Sharma",
    category: "Electrical", description: "Complete power outage to unit — no power to any outlets or lights. Happened suddenly at 11pm.", priority: "P1", status: "escalated", submittedAt: "2025-05-01T23:14:00Z", aiTriaged: true, estimatedCost: 450, suggestedAction: "Immediate escalation — possible switchboard fault. PM to call emergency electrician now.",
    pendingApproval: true,
    aiAnalysis: "P1 EMERGENCY: Complete power loss to entire unit suggests switchboard failure or tripped main switch. Cannot be resolved by tenant. Risk of food spoilage, heating/cooling loss, and potential fire hazard if switchboard fault. Emergency electrician required immediately — do not wait for business hours.",
    confidenceScore: 0.97, suggestedVendors: [{ name: "Emergency Electrical NSW", rate: "$180/hr (emergency)", preApproved: true }], ownerPreferences: "No auto-approve threshold for P1 emergencies — immediate dispatch authorised.", draftOwnerSms: "URGENT: Priya at 3/22 Pacific Hwy has a full power outage (P1 emergency). We're dispatching an emergency electrician now under your P1 emergency authorisation. We'll update you shortly.", draftTenantAck: "Hi Priya, we've received your emergency report. An electrician is being dispatched right now and should arrive within 60–90 minutes. Please stay warm and keep the fridge closed."
  },
  {
    id: "m3", propertyAddress: "14 Harbour View Tce, Mosman", tenantName: "Sarah & James Whitfield",
    category: "HVAC", description: "Air conditioning unit in master bedroom making loud grinding noise and not cooling properly.", priority: "P3", status: "open", submittedAt: "2025-04-29T14:05:00Z", aiTriaged: true, estimatedCost: 380, suggestedAction: "Schedule HVAC technician within 7 days — likely compressor fan bearing issue.",
    pendingApproval: false,
    aiAnalysis: "Symptom pattern (grinding + reduced cooling) matches compressor fan bearing failure in 73% of historical cases. Not an emergency but will worsen. Recommend HVAC specialist within 5–7 days. Owner has no auto-approve threshold for HVAC — requires explicit approval above $300.",
    confidenceScore: 0.78, suggestedVendors: [{ name: "Cool Climate Services", rate: "$130/hr", preApproved: true }], ownerPreferences: "Approve all HVAC work above $200 — requires written approval.", draftOwnerSms: "Hi Michael, Sarah at 14 Harbour View has an A/C issue — grinding noise and reduced cooling. Estimated $320–$450 to repair. Please approve so we can schedule Cool Climate Services this week.", draftTenantAck: "Hi Sarah, we're organising an HVAC technician for your A/C. We'll confirm the appointment time within 24 hours."
  },
  {
    id: "m4", propertyAddress: "18/40 Kurraba Road, Neutral Bay", tenantName: "Ethan Clarke",
    category: "Cosmetic", description: "Bathroom tiles have hairline cracks along the grout line near the shower base.", priority: "P4", status: "open", submittedAt: "2025-04-28T10:30:00Z", aiTriaged: true, estimatedCost: 180, suggestedAction: "Schedule tiler at next convenient time — cosmetic only, no water ingress risk.",
    pendingApproval: false,
    aiAnalysis: "Visual pattern consistent with minor grout shrinkage (not tile substrate failure). No water ingress risk based on description. P4 routine maintenance. Recommend regrout at next scheduled maintenance visit.",
    confidenceScore: 0.85, suggestedVendors: [{ name: "Sydney Tile & Grout", rate: "$85/hr", preApproved: true }], ownerPreferences: "Auto-approve routine maintenance under $250.", draftOwnerSms: "", draftTenantAck: ""
  },
  {
    id: "m5", propertyAddress: "12/5 Rangers Road, Cremorne Point", tenantName: "Aaron & Kelly Thompson",
    category: "Structural", description: "Large crack appearing in the ceiling of the lounge room — appeared after recent rain.", priority: "P2", status: "pending-approval", submittedAt: "2025-05-01T11:45:00Z", aiTriaged: true, estimatedCost: 1200, suggestedAction: "Urgent inspection — water ingress and ceiling integrity risk.",
    pendingApproval: true,
    aiAnalysis: "Post-rain ceiling crack suggests active water ingress from above (roof or plumbing leak). Risk of ceiling collapse if water has pooled in roof cavity. Recommend builder/roof plumber inspection within 24h. This is borderline P1/P2 — escalating to P2 with urgent notation.",
    confidenceScore: 0.83, suggestedVendors: [{ name: "North Shore Builders", rate: "Quote required", preApproved: false }], ownerPreferences: "No threshold set for structural issues — always requires owner approval.", draftOwnerSms: "URGENT: Ceiling crack appeared after rain at 12/5 Rangers Rd. Possible water ingress — inspection required within 24 hours. Estimated $800–$1,500 for investigation and repair. Please approve ASAP.", draftTenantAck: "Hi Aaron, we're taking this seriously and have arranged an urgent inspection for tomorrow. Please avoid the affected area and contact us if the crack grows or water appears."
  },
  {
    id: "m6", propertyAddress: "99 Spofforth Street, Mosman", tenantName: "Claudia Barros",
    category: "Plumbing", description: "Hot water system not working — cold water only from all taps.", priority: "P2", status: "resolved", submittedAt: "2025-04-27T16:00:00Z", aiTriaged: true, estimatedCost: 320, suggestedAction: "Replace hot water system thermostat — unit is 9 years old.",
    pendingApproval: false,
    aiAnalysis: "Loss of hot water across all taps indicates system-level failure (not individual tap). Hot water unit is 9 years old (per property records) and at end of expected lifespan. Recommend replacement rather than repair for cost-effectiveness. Owner approved full replacement at $1,850.",
    confidenceScore: 0.94, suggestedVendors: [{ name: "Harbour Plumbing", rate: "$95/hr", preApproved: true }], ownerPreferences: "Auto-approve hot water replacements — Raj has standing instruction.", draftOwnerSms: "", draftTenantAck: ""
  },
];

export const mockLeases = [
  { id: "l1", propertyAddress: "14 Harbour View Tce, Mosman", tenantName: "Sarah & James Whitfield", landlordName: "Michael Chen", startDate: "2023-08-15", endDate: "2025-08-15", weeklyRent: 1850, status: "active", daysUntilExpiry: 106, documentParsed: true, complianceStatus: "compliant" },
  { id: "l2", propertyAddress: "3/22 Pacific Highway, Neutral Bay", tenantName: "Priya Sharma", landlordName: "Linda Park", startDate: "2023-03-31", endDate: "2025-03-31", weeklyRent: 720, status: "expired", daysUntilExpiry: -31, documentParsed: true, complianceStatus: "attention-required" },
  { id: "l3", propertyAddress: "7/190 Military Road, Cremorne", tenantName: "Oliver Nguyen", landlordName: "Fiona Walsh", startDate: "2024-11-30", endDate: "2025-11-30", weeklyRent: 580, status: "active", daysUntilExpiry: 213, documentParsed: true, complianceStatus: "compliant" },
  { id: "l4", propertyAddress: "12/5 Rangers Road, Cremorne Point", tenantName: "Aaron & Kelly Thompson", landlordName: "James Li", startDate: "2024-06-14", endDate: "2025-06-14", weeklyRent: 950, status: "active", daysUntilExpiry: 44, documentParsed: true, complianceStatus: "compliant" },
  { id: "l5", propertyAddress: "99 Spofforth Street, Mosman", tenantName: "Claudia Barros", landlordName: "Raj Mehta", startDate: "2024-01-20", endDate: "2026-01-20", weeklyRent: 2650, status: "active", daysUntilExpiry: 264, documentParsed: true, complianceStatus: "compliant" },
  { id: "l6", propertyAddress: "18/40 Kurraba Road, Neutral Bay", tenantName: "Ethan Clarke", landlordName: "Sue & Peter Yang", startDate: "2024-09-01", endDate: "2025-09-01", weeklyRent: 650, status: "active", daysUntilExpiry: 123, documentParsed: false, complianceStatus: "pending-review" },
  { id: "l7", propertyAddress: "8/33 Ben Boyd Road, Neutral Bay", tenantName: "Marcus Johansson", landlordName: "Derek Holt", startDate: "2024-07-31", endDate: "2025-07-31", weeklyRent: 490, status: "active", daysUntilExpiry: 91, documentParsed: true, complianceStatus: "compliant" },
];

export const mockLandlords = [
  { id: "ll1", name: "James Li", email: "james.li@email.com", phone: "0411 222 333", propertiesCount: 2, portfolioValue: 3800000, churnScore: 82, churnRisk: "high", topRiskFactors: ["3 unresolved maintenance tickets >14 days", "Rent 8% below suburb median", "No contact in 47 days"], recommendedIntervention: "BDM call this week — propose rent review and maintenance resolution plan", lastContact: "2025-03-15", avatarInitials: "JL" },
  { id: "ll2", name: "Raj Mehta", email: "raj.mehta@email.com", phone: "0422 444 555", propertiesCount: 3, portfolioValue: 7200000, churnScore: 24, churnRisk: "low", topRiskFactors: ["All maintenance resolved promptly"], recommendedIntervention: "No intervention needed — strong relationship", lastContact: "2025-04-28", avatarInitials: "RM" },
  { id: "ll3", name: "Linda Park", email: "linda.park@email.com", phone: "0433 666 777", propertiesCount: 1, portfolioValue: 1250000, churnScore: 71, churnRisk: "high", topRiskFactors: ["Tenant in arrears $1,440", "Lease expired — not renewed", "3 complaints from tenant in past 60 days"], recommendedIntervention: "Urgent PM call — address arrears recovery plan and lease renewal options", lastContact: "2025-04-10", avatarInitials: "LP" },
  { id: "ll4", name: "Michael Chen", email: "m.chen@email.com", phone: "0444 888 999", propertiesCount: 2, portfolioValue: 4100000, churnScore: 38, churnRisk: "medium", topRiskFactors: ["HVAC repair approval pending 5 days", "Rent increase not discussed for 18 months"], recommendedIntervention: "Schedule quarterly review — address pending HVAC and rent discussion", lastContact: "2025-04-22", avatarInitials: "MC" },
  { id: "ll5", name: "Fiona Walsh", email: "f.walsh@email.com", phone: "0455 111 222", propertiesCount: 1, portfolioValue: 980000, churnScore: 15, churnRisk: "low", topRiskFactors: ["No issues flagged"], recommendedIntervention: "Maintain regular contact — excellent landlord", lastContact: "2025-04-30", avatarInitials: "FW" },
  { id: "ll6", name: "Helena & Tom Russo", email: "russo.property@email.com", phone: "0466 333 444", propertiesCount: 2, portfolioValue: 5500000, churnScore: 91, churnRisk: "critical", topRiskFactors: ["Property vacant 45 days", "Listed with competitor agency in suburb", "Requested rent roll transfer documents (not yet confirmed)", "No response to last 2 PM calls"], recommendedIntervention: "URGENT: Principal + BDM meeting required this week. Retention at high risk.", lastContact: "2025-04-05", avatarInitials: "HR" },
  { id: "ll7", name: "Derek Holt", email: "d.holt@email.com", phone: "0477 555 666", propertiesCount: 1, portfolioValue: 850000, churnScore: 45, churnRisk: "medium", topRiskFactors: ["Lease approaching expiry in 91 days", "Rent review overdue"], recommendedIntervention: "Contact tenant re lease renewal — discuss 5% rent increase with landlord", lastContact: "2025-04-18", avatarInitials: "DH" },
  { id: "ll8", name: "Sue & Peter Yang", email: "yang.property@email.com", phone: "0488 777 888", propertiesCount: 1, portfolioValue: 1100000, churnScore: 29, churnRisk: "low", topRiskFactors: ["Minor — lease document pending AI parse"], recommendedIntervention: "No urgent action needed", lastContact: "2025-04-25", avatarInitials: "SY" },
];

export const mockCampaigns = [
  {
    id: "c1", propertyAddress: "6 Hunters Road, Mosman", vendorName: "Robert & Anne Blackwood", agentName: "Vedant Patel", listingDate: "2025-04-07", priceGuide: "$3,950,000–$4,250,000", enquiries: 47, inspections: 23, offers: 3, status: "active", draftStatus: "draft-ready", weekNumber: 4,
    emailSubject: "Week 4 Campaign Update — 6 Hunters Road, Mosman",
    emailBody: `Dear Robert and Anne,

Thank you for your continued trust as we work together to achieve the best possible result for your Hunters Road home.

**Week 4 Highlights**

This week saw strong continued interest, with 47 total enquiries and 23 groups through inspections — a 26% increase on last week's attendance. Three written offers have now been received, and we are currently in active negotiations.

**Comparable Market Activity**

Two comparable Mosman homes sold this week:
• 14 Clifton Gardens Road — 5 bed/3 bath — $4,100,000 (settled)
• 8 Raglan Street — 4 bed/3 bath — $3,820,000 (unconditional exchange)

This confirms that buyer appetite in Mosman remains strong and that your price guide is well-calibrated to current market conditions.

**Our Recommendation**

Given the three offers received and comparable evidence, we believe a vendor bid of $4,050,000 at Saturday's auction is well-supported. We would like to discuss this strategy with you before the weekend.

We remain committed to achieving your best result and will be in touch to confirm the pre-auction meeting.

Warm regards,
Vedant Patel
TAG Real Estate — Mosman`,
    confidenceScore: 0.88, aiReasoning: "Strong campaign with 23 inspections and 3 offers in week 4. Comparable sales at $3.82M–$4.1M support the guide. Auction strategy recommended given competitive field.", priceRecommendation: "Vendor bid at $4,050,000 is well-supported by recent comps.",
    comparables: [{ address: "14 Clifton Gardens Rd", price: "$4,100,000", daysOnMarket: 28 }, { address: "8 Raglan Street", price: "$3,820,000", daysOnMarket: 35 }]
  },
  {
    id: "c2", propertyAddress: "2 Botanic Road, Mosman", vendorName: "Christine Lawson", agentName: "Hailey Drummond", listingDate: "2025-04-21", priceGuide: "$2,800,000–$3,000,000", enquiries: 18, inspections: 9, offers: 0, status: "active", draftStatus: "draft-ready", weekNumber: 2,
    emailSubject: "Week 2 Campaign Update — 2 Botanic Road, Mosman",
    emailBody: `Dear Christine,

We are two weeks into your campaign for 2 Botanic Road and I'm pleased to share some encouraging momentum.

**Week 2 Snapshot**

18 online enquiries and 9 private inspections this week. Feedback from buyers has been consistently positive on the renovation quality and north-facing aspect.

**Market Context**

The $2.8M–$3.0M Mosman price bracket remains competitive, with limited comparable stock. Your home is well-positioned as one of very few renovated properties in this range.

**Looking Ahead**

With two more inspection weeks before your planned auction date, we are targeting 15–20 additional inspections next week. I will follow up with all current registrations and push for second appointments.

Kind regards,
Hailey Drummond
TAG Real Estate — Neutral Bay`,
    confidenceScore: 0.82, aiReasoning: "Solid week 2 — no offers yet but strong inspection rate for the price bracket. Price guide appears accurate based on current engagement.", priceRecommendation: "Price guide appropriate. No adjustment recommended at this stage.",
    comparables: []
  },
  {
    id: "c3", propertyAddress: "19 Awaba Street, Mosman", vendorName: "The Singh Family", agentName: "Vedant Patel", listingDate: "2025-03-17", priceGuide: "$1,900,000–$2,050,000", enquiries: 62, inspections: 41, offers: 1, status: "active", draftStatus: "approved", weekNumber: 7,
    emailSubject: "Week 7 Update — 19 Awaba Street", emailBody: "", confidenceScore: 0.91, aiReasoning: "Campaign has run long (7 weeks). One offer at $1.88M (below guide). Recommend price guide adjustment discussion with vendor.", priceRecommendation: "Consider adjusting guide to $1,800,000–$1,950,000 based on single offer and 7-week market time.", comparables: []
  },
  {
    id: "c4", propertyAddress: "11/8 Cabramatta Road, Mosman", vendorName: "Ben & Lisa Harrington", agentName: "Hailey Drummond", listingDate: "2025-04-28", priceGuide: "$1,450,000–$1,550,000", enquiries: 6, inspections: 2, offers: 0, status: "active", draftStatus: "generating", weekNumber: 1,
    emailSubject: "", emailBody: "", confidenceScore: 0, aiReasoning: "", priceRecommendation: "", comparables: []
  },
];

export const mockDataSources = [
  {
    id: "ds1", name: "PropertyMe", description: "Primary PM workflow — tenants, maintenance, inspections, arrears", system: "PropertyMe", integrationMode: "API + Webhooks", status: "live", lastSync: new Date(Date.now() - 3 * 60 * 1000).toISOString(), nextSync: new Date(Date.now() + 57 * 60 * 1000).toISOString(), recordsIngested: 4842, eventsToday: 127, errorCount: 0, isLive: true, phase: "Phase 1", logoColor: "#2563eb"
  },
  {
    id: "ds2", name: "REA (realestate.com.au)", description: "Listings publication and inbound lead capture", system: "REA", integrationMode: "API", status: "live", lastSync: new Date(Date.now() - 8 * 60 * 1000).toISOString(), nextSync: new Date(Date.now() + 52 * 60 * 1000).toISOString(), recordsIngested: 1293, eventsToday: 34, errorCount: 0, isLive: true, phase: "Phase 1", logoColor: "#dc2626"
  },
  {
    id: "ds3", name: "MRI Vault", description: "Trust accounting, document custody, compliance certificates", system: "MRI Vault", integrationMode: "Scheduled CSV Export", status: "scheduled", lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), nextSync: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), recordsIngested: 8821, eventsToday: 1, errorCount: 2, isLive: false, phase: "Phase 1", logoColor: "#7c3aed"
  },
  {
    id: "ds4", name: "Eagle CRM", description: "Public-facing site, appraisal forms, sales CRM", system: "Eagle / Proptech Group", integrationMode: "API + CSV Export", status: "live", lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(), nextSync: new Date(Date.now() + 45 * 60 * 1000).toISOString(), recordsIngested: 2156, eventsToday: 58, errorCount: 1, isLive: true, phase: "Phase 1", logoColor: "#059669"
  },
];

export const mockIngestionEvents = [
  { id: "e1", sourceId: "ds1", sourceName: "PropertyMe", eventType: "maintenance.submitted", payload: '{"ticketId":"T-4421","property":"3/22 Pacific Hwy","tenant":"P. Sharma","category":"Electrical"}', timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
  { id: "e2", sourceId: "ds2", sourceName: "REA", eventType: "lead.created", payload: '{"leadId":"L-9921","property":"4 Holt Ave, Mosman","buyer":"T. Robertson","enquiryType":"inspection_request"}', timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
  { id: "e3", sourceId: "ds4", sourceName: "Eagle CRM", eventType: "appraisal.requested", payload: '{"formId":"APR-881","address":"72 Middle Head Rd, Mosman","contact":"K. Lim","source":"website"}', timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
  { id: "e4", sourceId: "ds1", sourceName: "PropertyMe", eventType: "inspection.completed", payload: '{"inspectionId":"INS-3302","property":"6 Hunters Rd, Mosman","attendees":8,"date":"2025-05-01"}', timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 8 },
  { id: "e5", sourceId: "ds3", sourceName: "MRI Vault", eventType: "export.completed", payload: '{"exportId":"EXP-112","records":1842,"type":"trust_account_statement","period":"Apr-2025"}', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1842 },
  { id: "e6", sourceId: "ds2", sourceName: "REA", eventType: "listing.enquiry", payload: '{"listingId":"2 Botanic Rd","enquiryId":"ENQ-5521","name":"S. Park","phone":"04XX XXX XXX"}', timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
  { id: "e7", sourceId: "ds1", sourceName: "PropertyMe", eventType: "arrears.updated", payload: '{"tenantId":"TEN-221","tenant":"P. Sharma","amount":1440,"weeks":2,"property":"3/22 Pacific Hwy"}', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
  { id: "e8", sourceId: "ds4", sourceName: "Eagle CRM", eventType: "lead.updated", payload: '{"leadId":"L-8821","stage":"qualified","agent":"Vedant Patel","suburb":"Mosman"}', timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
  { id: "e9", sourceId: "ds3", sourceName: "MRI Vault", eventType: "export.error", payload: '{"exportId":"EXP-111","error":"SFTP connection timeout","retry":true}', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), status: "error", recordsAffected: 0 },
  { id: "e10", sourceId: "ds1", sourceName: "PropertyMe", eventType: "lease.created", payload: '{"leaseId":"LSE-881","property":"7/190 Military Rd","tenant":"O. Nguyen","start":"2024-11-30"}', timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), status: "processed", recordsAffected: 1 },
];

export const mockAiProviders = [
  { id: "ap1", name: "Anthropic Claude", vendor: "Anthropic", status: "active", region: "global", models: ["claude-opus-4", "claude-sonnet-4", "claude-haiku-4"], monthlyCost: 892.40, callCount: 4821, avgLatencyMs: 4200, successRate: 0.997, isDefault: true },
  { id: "ap2", name: "OpenAI", vendor: "OpenAI", status: "active", region: "global", models: ["gpt-4o", "gpt-4o-mini", "text-embedding-3-large"], monthlyCost: 134.20, callCount: 8321, avgLatencyMs: 1200, successRate: 0.999, isDefault: false },
  { id: "ap3", name: "Azure OpenAI (AU East)", vendor: "Microsoft Azure", status: "active", region: "Australia East", models: ["gpt-4o", "gpt-4"], monthlyCost: 210.80, callCount: 1241, avgLatencyMs: 2800, successRate: 0.994, isDefault: false },
  { id: "ap4", name: "Google Gemini", vendor: "Google", status: "inactive", region: "global", models: ["gemini-1.5-pro", "gemini-flash"], monthlyCost: 0, callCount: 0, avgLatencyMs: 0, successRate: 0, isDefault: false },
];

export const mockAiTaskAssignments = [
  { id: "ta1", taskName: "vendor_email_draft", taskLabel: "Vendor Email Draft", primaryProvider: "Anthropic", primaryModel: "claude-opus-4", fallbackProvider: "Azure OpenAI", fallbackModel: "gpt-4o", costPerCall: 0.18, callsToday: 4, avgQualityScore: 0.89, containsPii: true },
  { id: "ta2", taskName: "maintenance_triage", taskLabel: "Maintenance Triage", primaryProvider: "Anthropic", primaryModel: "claude-sonnet-4", fallbackProvider: "OpenAI", fallbackModel: "gpt-4o", costPerCall: 0.04, callsToday: 6, avgQualityScore: 0.93, containsPii: true },
  { id: "ta3", taskName: "maintenance_classify_text_only", taskLabel: "Maintenance Classification (Text)", primaryProvider: "Anthropic", primaryModel: "claude-haiku-4", fallbackProvider: "OpenAI", fallbackModel: "gpt-4o-mini", costPerCall: 0.008, callsToday: 12, avgQualityScore: 0.88, containsPii: false },
  { id: "ta4", taskName: "lease_parse", taskLabel: "Lease Document Parse", primaryProvider: "Anthropic", primaryModel: "claude-sonnet-4", fallbackProvider: "Azure OpenAI", fallbackModel: "gpt-4o", costPerCall: 0.12, callsToday: 2, avgQualityScore: 0.96, containsPii: true },
  { id: "ta5", taskName: "churn_explain", taskLabel: "Churn Risk Explanation", primaryProvider: "Anthropic", primaryModel: "claude-sonnet-4", fallbackProvider: "OpenAI", fallbackModel: "gpt-4o", costPerCall: 0.05, callsToday: 8, avgQualityScore: 0.91, containsPii: true },
  { id: "ta6", taskName: "suburb_content", taskLabel: "Suburb Content Generation", primaryProvider: "Anthropic", primaryModel: "claude-sonnet-4", fallbackProvider: "OpenAI", fallbackModel: "gpt-4o", costPerCall: 0.09, callsToday: 0, avgQualityScore: 0.87, containsPii: false },
  { id: "ta7", taskName: "embeddings", taskLabel: "Vector Embeddings", primaryProvider: "OpenAI", primaryModel: "text-embedding-3-large", fallbackProvider: "OpenAI", fallbackModel: "text-embedding-3-small", costPerCall: 0.001, callsToday: 821, avgQualityScore: 0.99, containsPii: false },
];

export const mockAuditEntries = [
  { id: "au1", timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), userId: "u1", userName: "Vedant Patel", task: "vendor_email_draft", taskLabel: "Vendor Email Draft", provider: "Anthropic", model: "claude-opus-4", inputTokens: 2841, outputTokens: 892, costAud: 0.19, latencyMs: 5100, status: "success", workflowId: "wf-221", action: "Generated draft for 6 Hunters Road campaign" },
  { id: "au2", timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "maintenance_triage", taskLabel: "Maintenance Triage", provider: "Anthropic", model: "claude-sonnet-4", inputTokens: 1240, outputTokens: 580, costAud: 0.04, latencyMs: 3800, status: "success", workflowId: "wf-220", action: "Triaged P1 electrical emergency at 3/22 Pacific Hwy" },
  { id: "au3", timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "maintenance_triage", taskLabel: "Maintenance Triage", provider: "Anthropic", model: "claude-sonnet-4", inputTokens: 980, outputTokens: 421, costAud: 0.03, latencyMs: 4100, status: "success", workflowId: "wf-219", action: "Triaged P2 plumbing at 12/5 Rangers Rd" },
  { id: "au4", timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(), userId: "u1", userName: "Vedant Patel", task: "churn_explain", taskLabel: "Churn Risk Explanation", provider: "Anthropic", model: "claude-sonnet-4", inputTokens: 780, outputTokens: 320, costAud: 0.05, latencyMs: 3200, status: "success", workflowId: "wf-218", action: "Explained churn risk factors for landlord Helena & Tom Russo" },
  { id: "au5", timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(), userId: "u3", userName: "Hailey Drummond", task: "vendor_email_draft", taskLabel: "Vendor Email Draft", provider: "Anthropic", model: "claude-opus-4", inputTokens: 2650, outputTokens: 780, costAud: 0.17, latencyMs: 4900, status: "success", workflowId: "wf-217", action: "Generated draft for 2 Botanic Road campaign" },
  { id: "au6", timestamp: new Date(Date.now() - 72 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "embeddings", taskLabel: "Vector Embeddings", provider: "OpenAI", model: "text-embedding-3-large", inputTokens: 4200, outputTokens: 0, costAud: 0.002, latencyMs: 380, status: "success", workflowId: "wf-216", action: "Embedded 42 property descriptions for semantic search" },
  { id: "au7", timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "lease_parse", taskLabel: "Lease Document Parse", provider: "Anthropic", model: "claude-sonnet-4", inputTokens: 6800, outputTokens: 1200, costAud: 0.13, latencyMs: 8200, status: "success", workflowId: "wf-215", action: "Parsed residential lease for Ethan Clarke at 18/40 Kurraba Rd" },
  { id: "au8", timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "maintenance_triage", taskLabel: "Maintenance Triage", provider: "Anthropic", model: "claude-sonnet-4", inputTokens: 890, outputTokens: 380, costAud: 0.03, latencyMs: 3900, status: "success", workflowId: "wf-214", action: "Triaged P3 HVAC issue at 14 Harbour View Tce" },
  { id: "au9", timestamp: new Date(Date.now() - 3.2 * 60 * 60 * 1000).toISOString(), userId: "u1", userName: "Vedant Patel", task: "vendor_email_draft", taskLabel: "Vendor Email Draft", provider: "Anthropic", model: "claude-opus-4", inputTokens: 2920, outputTokens: 940, costAud: 0.20, latencyMs: 5400, status: "fallback", workflowId: "wf-213", action: "Draft for 19 Awaba St — fell back from claude-opus-4 to claude-sonnet-4 (rate limit)" },
  { id: "au10", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "churn_explain", taskLabel: "Churn Risk Explanation", provider: "Anthropic", model: "claude-sonnet-4", inputTokens: 640, outputTokens: 290, costAud: 0.04, latencyMs: 2900, status: "success", workflowId: "wf-212", action: "Daily churn score explanations for 3 at-risk landlords" },
  { id: "au11", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "embeddings", taskLabel: "Vector Embeddings", provider: "OpenAI", model: "text-embedding-3-large", inputTokens: 8400, outputTokens: 0, costAud: 0.003, latencyMs: 720, status: "success", workflowId: "wf-211", action: "Nightly re-embedding of suburb content and new maintenance descriptions" },
  { id: "au12", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), userId: "u2", userName: "System", task: "maintenance_classify_text_only", taskLabel: "Maintenance Classification (Text)", provider: "Anthropic", model: "claude-haiku-4", inputTokens: 2200, outputTokens: 480, costAud: 0.008, latencyMs: 1100, status: "success", workflowId: "wf-210", action: "Batch classified 12 maintenance submissions from PropertyMe webhook" },
];
