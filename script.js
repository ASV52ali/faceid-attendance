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
    canvas.width = 320;
    canvas.height = 240;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    sendToGoogleSheet(imageData);
};


// ----
function sendToGoogleSheet(imageBase64) {

    const GOOGLE_WEBHOOK = "PASTE_YOUR_WEBHOOK_HERE";  

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
