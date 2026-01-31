import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { notFound } from "./middlewares/notFound";
import golobalErrorHandler from "./middlewares/golobalErrorHandler";
import { tutorRouter } from "./modules/tutor/tutor.router";
import { categoryRouter } from "./modules/category/category.routes";
import { bookingRouter } from "./modules/booking/booking.router";
import { reviewRouter } from "./modules/review/review.router";
import { authRouter } from "./modules/auth/auth.router";
import { adminRouter } from "./modules/admin/admin.router";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

// app.use("/api/auth", authRouter);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/tutors", tutorRouter);
app.use("/categorys", categoryRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hey! I am Skill Bridge server");
});

app.use(notFound);
app.use(golobalErrorHandler);

export default app;
