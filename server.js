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

    res.json({
      success: true,
      message: "Backend is ready",
      prompt: prompt
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = app;