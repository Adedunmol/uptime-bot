import express from "express";
import { createMonitorController, deleteMonitorController, getMonitorController, getMonitorsController, updateMonitorController } from "../controllers/monitor.controller";
import validateResource from "../middlewares/validate-resource";
import { createMonitorSchema, getMonitorSchema, updateMonitorSchema } from "../schema/monitor.schema";

const router = express.Router();

router.route("/").get(getMonitorsController).post(validateResource(createMonitorSchema), createMonitorController);
router.route("/:id?/").get(validateResource(getMonitorSchema), getMonitorController)
                    .patch(validateResource(updateMonitorSchema), updateMonitorController)
                    .delete(validateResource(getMonitorSchema), deleteMonitorController);

export default router;