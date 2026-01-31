import express from "express";
import { tutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.get("/", tutorController.getTutors);
router.get("/:id", tutorController.getTutorById);

router.get(
  "/",
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorController.getTutorDashboard,
);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.TUTOR),
  tutorController.createTutorProfile,
);
router.put(
  "/profile",
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorController.updateTutorProfile,
);

export const tutorRouter = router;
