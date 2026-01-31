import { authService } from "./auth.service";
import { Request, Response } from "express";
import { auth } from "../../lib/auth";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.me(req);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to fetch user",
    });
  }
};

export const authController = {
  getUser,
};
