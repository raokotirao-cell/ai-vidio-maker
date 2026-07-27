const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Video Backend Running");
});

app.post("/api/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://pollo.ai/api/platform/generation/luma/luma-ray-2-0", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY
  },
  body: JSON.stringify({
    input: {
      prompt: prompt,
      resolution: "540p",
      length: 5,
      aspectRatio: "16:9"
    }
  })
});