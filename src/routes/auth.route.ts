import express from "express";
import { createUserController } from "../controllers/auth.controller";
import validateResource from "../middlewares/validate-resource";
import { createUserSchema } from "../schema/auth.schema";

const router = express.Router();

router.route("/register").post(validateResource(createUserSchema), createUserController);

export default router;