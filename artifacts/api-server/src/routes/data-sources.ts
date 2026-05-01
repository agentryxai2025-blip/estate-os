import { Router } from "express";
import { mockDataSources, mockIngestionEvents } from "./mock-data";

const router = Router();

const sources = [...mockDataSources] as typeof mockDataSources;
const events = [...mockIngestionEvents] as typeof mockIngestionEvents;
let eventCounter = events.length;

router.get("/data-sources", (req, res) => {
  // Simulate live counter updates
  const updated = sources.map(s => ({
    ...s,
    eventsToday: s.isLive ? s.eventsToday + Math.floor(Math.random() * 2) : s.eventsToday,
    lastSync: s.isLive ? new Date(Date.now() - Math.floor(Math.random() * 5) * 60 * 1000).toISOString() : s.lastSync,
  }));
  res.json(updated);
});

router.post("/data-sources/:id/ingest", (req, res) => {
  const source = sources.find(s => s.id === req.params.id);
  if (!source) return res.status(404).json({ error: "Not found" });
  
  // Generate a synthetic ingestion job
  const jobId = `job-${Date.now()}`;
  const estimatedRecords = source.id === "ds3" ? 1842 : source.id === "ds1" ? 342 : source.id === "ds2" ? 28 : 156;
  
  // Add synthetic events
  const eventTypes: Record<string, string[]> = {
    ds1: ["maintenance.submitted", "inspection.completed", "arrears.updated", "lease.created", "tenant.updated"],
    ds2: ["lead.created", "listing.enquiry", "listing.updated", "inspection.booked"],
    ds3: ["export.started", "export.completed", "trust_account.reconciled"],
    ds4: ["appraisal.requested", "lead.updated", "contact.created", "campaign.updated"],
  };
  
  const types = eventTypes[source.id] || ["data.synced"];
  const newEvent = {
    id: `e${++eventCounter}`,
    sourceId: source.id,
    sourceName: source.name,
    eventType: `ingestion.manual_trigger`,
    payload: JSON.stringify({ jobId, trigger: "manual", source: source.system, records: estimatedRecords }),
    timestamp: new Date().toISOString(),
    status: "processing",
    recordsAffected: estimatedRecords,
  };
  events.unshift(newEvent);
  
  res.json({
    jobId,
    sourceId: source.id,
    status: "processing",
    startedAt: new Date().toISOString(),
    estimatedRecords,
  });
});

router.get("/data-sources/events", (req, res) => {
  // Return the most recent 20 events, freshest first
  res.json(events.slice(0, 20));
});

export default router;
