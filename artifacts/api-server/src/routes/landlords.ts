import { Router } from "express";
import { mockLandlords } from "./mock-data";

const router = Router();

router.get("/landlords", (req, res) => {
  const sorted = [...mockLandlords].sort((a, b) => b.churnScore - a.churnScore);
  res.json(sorted);
});

export default router;
