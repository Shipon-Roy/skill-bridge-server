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

router.get(
  "/availability",
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorController.getAvailability,
);
router.put(
  "/availability",
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorController.setAvailability,
);

export const tutorRouter = router;
