import QRCode from "qrcode";
import "./style.css";

const app = document.querySelector("#app");

function getBaseUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function isLandingPage() {
  return new URLSearchParams(window.location.search).get("page") === "message";
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
          <button id="previewBtn" class="primary-btn">ገጹን ቀጥታ ይመልከቱ <span>→</span></button>
        </section>
      </main>

      <footer class="footer">
        <span>ለመልእክት ማካፈል የተሰራ።</span>
        <span>✝</span>
      </footer>
    </div>
  `;

  const destination = `${getBaseUrl()}?page=message`;
  document.querySelector("#destination").textContent = destination;

  QRCode.toCanvas(document.querySelector("#qr"), destination, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#0b0b0d", light: "#ffffff" }
  });

  document.querySelector("#previewBtn").addEventListener("click", () => {
    window.location.href = "?page=message";
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
      </main>
    </div>
  `;
}

isLandingPage() ? renderLanding() : renderGenerator();