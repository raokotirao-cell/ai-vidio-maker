const multer = require("multer");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage()
});

app.get("/", (req, res) => {
  res.send("AI Video Backend Running");
});


app.post("/api/generate-video", upload.single("image"), async (req, res) => {

  try {

    const prompt = req.body.prompt;
    const image = req.file;


    if (!image) {

      return res.status(400).json({
        success: false,
        error: "Image is required"
      });

    }


    if (!process.env.API_KEY) {

      return res.status(500).json({
        success: false,
        error: "API_KEY is missing"
      });

    }


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


    res.json({

      success: true,

      taskId: data.taskId,

      response: data

    });


  } catch (err) {


    console.log(err);


    res.status(500).json({

      success: false,

      error: String(err)

    });


  }

});


module.exports = app;