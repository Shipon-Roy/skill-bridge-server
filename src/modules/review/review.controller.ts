import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const { tutorId, rating, comment } = req.body;

  const review = await reviewService.createReview(
    req.user!.id,
    tutorId,
    rating,
    comment,
  );

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
};

export const reviewController = {
  createReview,
};
