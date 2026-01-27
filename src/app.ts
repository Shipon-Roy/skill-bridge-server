import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hey! I am Skill Bridge server");
});

export default app;
