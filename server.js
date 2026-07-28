const multer = require("multer");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });
app.get("/", (req, res) => {
  res.send("AI Video Backend Running");
});
app.post("/api/generate-video", async
 (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://pollo.ai/api/platform/generation/luma/luma-ray-2-0",
      {
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
      }
    );

    const data = await response.json();

    const taskId = data.taskId;    let result;

    while (true) {
      const statusResponse = await fetch(
        `https://pollo.ai/api/platform/generation/${taskId}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY
          }
        }
      );

      result = await statusResponse.json();

      if (result.status === "succeed") {
        break;
      }

      if (result.status === "failed") {
        throw new Error("Video generation failed");
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    res.json({
      success: true,
      videoUrl: result.generations[0].url
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = app;