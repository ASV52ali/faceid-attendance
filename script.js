const video = document.getElementById("camera");
const btn = document.getElementById("captureBtn");
const status = document.getElementById("status");
const nameInput = document.getElementById("nameInput");

// --- توکن و Chat ID خودت را جایگزین کن ---
const BALE_TOKEN = "2086834694:UpTaAb1Y9FCL4GRvWL3S6VJAU0E_xD8JWKA";
const CHAT_ID = "1180806059";

// فعال کردن وبکم
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream)
.catch(err => status.innerText = "دوربین فعال نشد");

// ثبت حضور و ارسال به بله
btn.onclick = async () => {
    const name = nameInput.value.trim();
    if (!name) {
        status.innerText = "لطفا نام خود را وارد کنید";
        return;
    }

    status.innerText = "در حال ثبت حضور...";

    // عکس گرفتن از ویدئو
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // تبدیل به Blob
    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", blob, "attendance.png");
        formData.append("caption", ${name}\nتاریخ: ${new Date().toLocaleDateString('fa-IR')}\nساعت: ${new Date().toLocaleTimeString('fa-IR')});

        try {
            const res = await fetch(https://tapi.bale.ai/bot${BALE_TOKEN}/sendPhoto, {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                status.innerText = "✔ حضور ثبت شد و عکس ارسال شد";
            } else {
                status.innerText = "❌ خطا در ارسال به بله";
            }
        } catch (e) {
            console.error(e);
            status.innerText = "❌ خطا در ارسال";
        }
    }, "image/png");
};
