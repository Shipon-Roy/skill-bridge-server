import { NextFunction, Request, Response } from "express";
import { tutorSerive } from "./tutor.service";

const createTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "!Unauthorized!!!",
      });
    }

    const result = await tutorSerive.createTutor(req.body, user?.id);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const tutorController = {
  createTutor,
};
