import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { notFound } from "./middlewares/notFound";
import golobalErrorHandler from "./middlewares/golobalErrorHandler";
import { tutorRouter } from "./modules/tutor/tutor.router";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/tutors", tutorRouter);

app.get("/", (req, res) => {
  res.send("Hey! I am Skill Bridge server");
});

app.use(notFound);
app.use(golobalErrorHandler);

export default app;
