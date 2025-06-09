// 🔥 Chat with Infinity AI
async function askAI() {
    let query = document.getElementById("queryInput").value;
    let res = await fetch(`http://127.0.0.1:8000/chat/${query}?manual_trigger=true`);
    let data = await res.json();
    document.getElementById("response").innerText = data.response;
}

// 🎤 Speech Recognition ("Hi Gyani")
function startListening() {
    let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = function(event) {
        let voiceText = event.results[0][0].transcript;
        document.getElementById("queryInput").value = voiceText;
        askAI();
    };
}

// 📄 Upload PDF for AI Learning
async function uploadPDF() {
    let file = document.getElementById("pdfUpload").files[0];
    let formData = new FormData();
    formData.append("file", file);

    let res = await fetch("http://127.0.0.1:8000/upload_pdf/", {
        method: "POST",
        body: formData
    });

    let data = await res.json();
    alert("PDF Summary: " + data.preview);
}

// 📄 Query from PDF
async function queryPDF() {
    let query = prompt("Ask something from the uploaded PDF:");
    let res = await fetch(`http://127.0.0.1:8000/pdf_qa/?query=${query}`);
    let data = await res.json();
    alert("PDF Answer: " + data.results.join("\n"));
}

// 🖼️ Generate Image Caption
async function imageCaption() {
    let file = prompt("Select an image file to caption.");
    let res = await fetch("http://127.0.0.1:8000/image_caption/", {
        method: "POST",
        body: file
    });

    let data = await res.json();
    alert("AI Caption: " + data.caption);
}

// 🎞️ Generate Video Summary
async function videoSummary() {
    let file = prompt("Select a video file to summarize.");
    let res = await fetch("http://127.0.0.1:8000/video_summary/", {
        method: "POST",
        body: file
    });

    let data = await res.json();
    alert("Video Summary: " + data.summary);
}

// 🌍 Translate Text
async function translateText() {
    let query = prompt("Enter text to translate:");
    let res = await fetch(`http://127.0.0.1:8000/translate/?query=${query}&target_lang=hi`);
    let data = await res.json();
    alert("Translated: " + data.translated);
}
