// ===================================
// FEAR — COMPLETE STABLE BUILD
// Replace entire file every time
// ===================================

const APP_VERSION = "0.2.0";

// ---------- USER & SESSION ----------
let USER_ID = localStorage.getItem("fear_user_id");
if (!USER_ID) {
  USER_ID = "user_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem("fear_user_id", USER_ID);
}
const SESSION_SEED = Math.floor(Math.random() * 1000000);

// ---------- CANVAS ----------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ---------- WORLD STATE ----------
const WORLD = {
  chaos: 0,
  pulse: 0
};

// ---------- INPUT ----------
window.addEventListener("keydown", () => {
  WORLD.chaos = Math.min(WORLD.chaos + 0.3, 3);
});

// ---------- SPOOKY HANDS ----------
const handImages = [
  "images/hand1.png",
  "images/hand2.png"
];

let handImg = new Image();
let handActive = false;
let handAlpha = 0;
let handX = 0;
let handY = 0;
let currentWhisper = "";

const whispers = [
  "sin is necessary to feel alive ❤️",
  "to live is to touch the forbidden",
  "purity without desire is death",
  "even fear wants to be loved"
];

function summonHand() {
  const src = handImages[Math.floor(Math.random() * handImages.length)];
  handImg.src = src;

  handX = Math.random() * canvas.width * 0.7;
  handY = Math.random() * canvas.height * 0.7;

  handAlpha = 0;
  handActive = true;
  currentWhisper = whispers[Math.floor(Math.random() * whispers.length)];

  setTimeout(() => {
    handActive = false;
  }, 4000 + Math.random() * 3000);
}

// random apparition
setInterval(() => {
  if (Math.random() < 0.35) summonHand();
}, 9000);

// ---------- SPIRAL ----------
let angleOffset = Math.random() * Math.PI * 2;

function drawSpiral() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  WORLD.pulse = Math.abs(Math.sin(Date.now() * 0.002));

  const red = 120 + (SESSION_SEED % 80) + WORLD.pulse * 80;
  const green = 10 + WORLD.chaos * 20;
  const blue = 10;

  ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
  ctx.lineWidth = 1 + WORLD.chaos;

  ctx.beginPath();
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < 650; i++) {
    const angle = i * 0.15 + angleOffset;
    const radius = i * 0.45;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  angleOffset += 0.002;
  WORLD.chaos *= 0.96;

  // ---------- HAND ----------
  if (handActive && handImg.complete) {
    handAlpha = Math.min(handAlpha + 0.01, 0.6);
    ctx.globalAlpha = handAlpha;
    ctx.drawImage(handImg, handX, handY, 220, 220);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(255,120,120,0.75)";
    ctx.font = "14px serif";
    ctx.fillText(currentWhisper, handX, handY - 10);
  }

  // ---------- UI ----------
  ctx.fillStyle = "rgba(255,80,80,0.5)";
  ctx.font = "12px monospace";
  ctx.fillText("FEAR v" + APP_VERSION, 20, 20);
  ctx.fillText("id: " + USER_ID, 20, 36);
}

// ---------- LOOP ----------
function animate() {
  drawSpiral();
  requestAnimationFrame(animate);
}
animate();
