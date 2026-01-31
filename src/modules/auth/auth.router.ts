import { authController } from "./auth.controller";

import express, { Router } from "express";

const router = express.Router();

router.get("/me", authController.getUser);

export const authRouter: Router = router;
