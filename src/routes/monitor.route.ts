import express from "express";
import { createMonitorController } from "../controllers/monitor.controller";
import validateResource from "../middlewares/validate-resource";
import { createMonitorSchema } from "../schema/monitor.schema";

const router = express.Router();

router.route("/").post(validateResource(createMonitorSchema), createMonitorController);

export default router;