const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Video Backend Running");
});

app.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    // ఇక్కడ తర్వాత Pika AI API call add చేస్తాం

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});