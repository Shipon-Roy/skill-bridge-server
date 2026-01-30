import express from "express";
import { tutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.get("/", tutorController.getTutors);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.TUTOR),
  tutorController.createTutorProfile,
);

export const tutorRouter = router;
