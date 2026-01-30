import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const profile = await tutorService.createProfile(
      userId as string,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: profile,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create tutor profile",
    });
  }
};

export const tutorController = {
  createTutorProfile,
};
