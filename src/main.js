import QRCode from "qrcode";
import "./style.css";

const app = document.querySelector("#app");

function getBaseUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function isLandingPage() {
  return new URLSearchParams(window.location.search).get("page") === "message";
}

function showToast(message, type = "default") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span></span>
    `;
    document.body.appendChild(toast);
  }
  toast.querySelector("span").textContent = message;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => toast.classList.remove("show"), 3000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("ወደ clipboard ተቀበል!", "success");
  } catch {
    showToast("ማስቀረት አልተሳካም", "error");
  }
}

async function downloadQRCode(canvas) {
  try {
    const link = document.createElement("a");
    link.download = "jesus-connection-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("QR ኮድ ተነድቷል!", "success");
  } catch {
    showToast("መነድት አልተሳካም", "error");
  }
}

function sharePage() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: "የኢየሱስ ግንኙነት",
      text: "ነፃ ዋይ-ፋይ QR ኮድ - ስካን እና ግንባታ",
      url
    }).catch(() => copyToClipboard(url));
  } else {
    copyToClipboard(url);
  }
}

function renderGenerator() {
  app.innerHTML = `
    <div class="page generator-page">
      <header class="topbar">
        <div class="brand"><span class="brand-cross">✝</span> የኢየሱስ ግንኙነት</div>
        <span class="badge">ነፃ ዋይ-ፋይ ልምድ</span>
      </header>

      <main class="generator-shell">
        <section class="hero-copy">
          <p class="eyebrow">ስካን • ግንባታ • ፈልግ</p>
          <h1>ግንኙነትዎን<br><em>ፍጠር።</em></h1>
          <p class="intro">
            ይህ QR ኮድ አንድ ቀላል ሥራን ያደርጋል፡ ሰው ያለውን ሲስካን፣
            ወደ ስለ ኢየሱስ ጽቡቅ መልእክት ይወስዳል።
          </p>

          <div class="url-box">
            <span>QR መዳረሻ</span>
            <strong id="destination"></strong>
            <button class="btn btn-icon" id="copyUrlBtn" aria-label="Copy URL" title="ወደ clipboard ይቀበል">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>

          <div class="steps">
            <div><b>01</b><span>ይህን QR ኮድን ያሳይ</span></div>
            <div><b>02</b><span>ማንኛውም ያስካን ዘይቤ</span></div>
            <div><b>03</b><span>የኢየሱስ መልእክት ይከፍታል</span></div>
          </div>
        </section>

        <section class="qr-card">
          <div class="qr-label">ነፃ ዋይ-ፋይ</div>
          <div class="qr-wrap">
            <canvas id="qr"></canvas>
          </div>
          <p class="scan-text">ለመግንባት ስካን ያድርጉ</p>
          <p class="qr-note">የስልክዎን ካሜራ ወደ ኮዱ ይዘይቡ</p>
          <div class="btn-group">
            <button id="previewBtn" class="btn btn-gold">ገጹን ቀጥታ ይመልከቱ <span>→</span></button>
            <button id="downloadBtn" class="btn btn-outline" aria-label="Download QR code">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>አስቀርጥ</span>
            </button>
          </div>
        </section>
      </main>

      <footer class="footer">
        <span>ለመልእክት ማካፈል የተሰራ።</span>
        <span>✝</span>
      </footer>
    </div>
  `;

  const destination = `${getBaseUrl()}?page=message`;
  const destEl = document.querySelector("#destination");
  destEl.textContent = destination;

  QRCode.toCanvas(document.querySelector("#qr"), destination, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#0b0b0d", light: "#ffffff" }
  }).catch(console.error);

  const qrCanvas = document.querySelector("#qr");

  document.querySelector("#previewBtn").addEventListener("click", () => {
    window.location.href = "?page=message";
  });

  document.querySelector("#copyUrlBtn").addEventListener("click", () => copyToClipboard(destination));

  document.querySelector("#downloadBtn").addEventListener("click", () => downloadQRCode(qrCanvas));

  // Keyboard support for copy button
  document.querySelector("#copyUrlBtn").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyToClipboard(destination);
    }
  });
}

function renderLanding() {
  app.innerHTML = `
    <div class="landing-page">
      <div class="ambient ambient-one"></div>
      <div class="ambient ambient-two"></div>

      <main class="message-card">
        <div class="cross-mark">✝</div>

        <p class="welcome">አሁን እዚህ ነዎት</p>

        <div class="gold-line"></div>

        <h1>
          የሚያስፈልገዎት የተወሰነ<br />
          የተለየ ግንኙነት<br />
          <span>ኢየሱስ ነው።</span>
        </h1>

        <p class="message">
          ነፃ ዋይ-ፋይ ወደ እዚህ አመጣዎት።<br />
          አሁን ትንሽ ጊዜ ይዞ ከእሱ ጋር ይገናኙ።
        </p>

        <div class="verse-card">
          <div class="quote-mark">“</div>
          <p>እኔ መንገድና እውነትና ህይወት ነኝ።</p>
          <span>ዮሐንስ 14:6</span>
        </div>

        <div class="bottom-mark">
          <span>✦</span>
          <span>በግንዛቤ ግንባታ</span>
          <span>✦</span>
        </div>

        <button class="btn btn-gold" id="shareBtn" style="margin-top: 32px;" aria-label="Share this page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>አካፍል</span>
        </button>
      </main>
    </div>
  `;

  document.querySelector("#shareBtn").addEventListener("click", sharePage);
}

isLandingPage() ? renderLanding() : renderGenerator();