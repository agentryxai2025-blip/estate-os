import { Router } from "express";
import { mockLeases } from "./mock-data";

const router = Router();

router.get("/leases", (req, res) => {
  const { status } = req.query;
  let results = [...mockLeases];
  if (status) results = results.filter(l => l.status === status);
  res.json(results);
});

export default router;
