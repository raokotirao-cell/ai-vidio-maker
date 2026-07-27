const API_URL = "https://your-backend-url.onrender.com/generate-video";

async function generateVideo() {

  const prompt = document.getElementById("prompt").value;
  const file = document.getElementById("file").files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("prompt", prompt);

  document.getElementById("status").innerHTML = "Generating AI Video...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.videoUrl) {
      const video = document.getElementById("video");
      video.src = data.videoUrl;
      video.style.display = "block";
      video.load();
      video.play();

      document.getElementById("status").innerHTML = "Video Ready";
    } else {
      document.getElementById("status").innerHTML = "Video generation failed";
    }

  } catch (e) {
    document.getElementById("status").innerHTML = "Server Error";
  }
}