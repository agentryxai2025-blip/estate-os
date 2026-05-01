import { Router } from "express";
import { mockAuditEntries } from "./mock-data";

const router = Router();

router.get("/audit", (req, res) => {
  const { task, limit } = req.query;
  let results = [...mockAuditEntries];
  if (task) results = results.filter(a => a.task === task);
  const lim = limit ? parseInt(limit as string) : 50;
  res.json(results.slice(0, lim));
});

export default router;
