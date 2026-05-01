import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import propertiesRouter from "./properties";
import tenantsRouter from "./tenants";
import maintenanceRouter from "./maintenance";
import leasesRouter from "./leases";
import landlordsRouter from "./landlords";
import campaignsRouter from "./campaigns";
import dataSourcesRouter from "./data-sources";
import aiConfigRouter from "./ai-config";
import auditRouter from "./audit";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(propertiesRouter);
router.use(tenantsRouter);
router.use(maintenanceRouter);
router.use(leasesRouter);
router.use(landlordsRouter);
router.use(campaignsRouter);
router.use(dataSourcesRouter);
router.use(aiConfigRouter);
router.use(auditRouter);

export default router;
