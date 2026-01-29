import express from "express";
import { tutorController } from "./tutor.controller";
import auth, { Role } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(Role.ADMIN, Role.TUTOR), tutorController.createTutor);

export const tutorRouter = router;
