import express from "express";
import { createUserController, loginUserController, refreshTokenController } from "../controllers/auth.controller";
import validateResource from "../middlewares/validate-resource";
import { createUserSchema, loginUserSchema } from "../schema/auth.schema";

const router = express.Router();

router.route("/register").post(validateResource(createUserSchema), createUserController);
router.route("/login").post(validateResource(loginUserSchema), loginUserController);
router.route("/refresh").get(refreshTokenController);

export default router;