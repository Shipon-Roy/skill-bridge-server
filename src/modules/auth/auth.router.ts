import { authController } from "./auth.controller";

import express, { Router } from "express";

const router = express.Router();

router.get("/me", authController.getUser);

router.post("/sign-up/email", authController.register);
router.post("/sign-in/email", authController.login);

export const authRouter: Router = router;
