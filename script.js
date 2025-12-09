const video = document.getElementById("camera");
const btn = document.getElementById("captureBtn");
const statusBox = document.getElementById("status");

// ---------- فعال کردن دوربین ----------
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        statusBox.innerText = "خطا در دسترسی به دوربین";
        console.error(err);
    });


// ----------
btn.onclick = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 120;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    sendToGoogleSheet(imageData);
};


// ----
function sendToGoogleSheet(imageBase64) {

    const GOOGLE_WEBHOOK = "https://script.google.com/macros/s/AKfycbwL2tJlMvoFQrwl3v7g5zljCgvo7Fm65ITGdER92wu2GdoIcaHkVeQDWtJuxRNwrCPl/exec";  

    fetch(GOOGLE_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
            timestamp: new Date().toLocaleString("fa-IR"),
            image: imageBase64
        })
    })
    .then(res => {
        statusBox.innerText = "✔ ثبت شد";
    })
    .catch(err => {
        statusBox.innerText = "❌ خطا در ارسال";
        console.error(err);
    });
}
