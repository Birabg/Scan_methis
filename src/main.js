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
        <div class="brand"><span class="brand-cross">✝</span> JESUS CONNECTION</div>
        <span class="badge">FREE WI-FI EXPERIENCE</span>
      </header>

      <main class="generator-shell">
        <section class="hero-copy">
          <p class="eyebrow">SCAN • CONNECT • DISCOVER</p>
          <h1>Create your<br><em>connection.</em></h1>
          <p class="intro">
            This QR code does one simple thing: when someone scans it,
            they are taken to a beautiful message about Jesus.
          </p>

          <div class="url-box">
            <span>QR destination</span>
            <strong id="destination"></strong>
          </div>

          <div class="steps">
            <div><b>01</b><span>Show this QR code</span></div>
            <div><b>02</b><span>Let someone scan it</span></div>
            <div><b>03</b><span>The Jesus message opens</span></div>
          </div>
        </section>

        <section class="qr-card">
          <div class="qr-label">FREE WI-FI</div>
          <div class="qr-wrap">
            <canvas id="qr"></canvas>
          </div>
          <p class="scan-text">SCAN TO CONNECT</p>
          <p class="qr-note">Point your phone camera at the code</p>
          <button id="previewBtn" class="primary-btn">Preview landing page <span>→</span></button>
        </section>
      </main>

      <footer class="footer">
        <span>Made to share a message.</span>
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

        <p class="welcome">YOU'RE HERE</p>

        <div class="gold-line"></div>

        <h1>
          The only connection<br />
          that you need is<br />
          <span>Jesus.</span>
        </h1>

        <p class="message">
          Free Wi-Fi brought you here.<br />
          Now take a moment to connect with Him.
        </p>

        <div class="verse-card">
          <div class="quote-mark">“</div>
          <p>I am the way, the truth, and the life.</p>
          <span>John 14:6</span>
        </div>

        <div class="bottom-mark">
          <span>✦</span>
          <span>CONNECT WITH PURPOSE</span>
          <span>✦</span>
        </div>
      </main>
    </div>
  `;
}

isLandingPage() ? renderLanding() : renderGenerator();