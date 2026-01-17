// ===============================
// FEAR — Minimal Working App
// ===============================

// App version
const APP_VERSION = "0.1.0";

// Unique user (per device)
let USER_ID = localStorage.getItem("fear_user_id");
if (!USER_ID) {
  USER_ID = "user_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem("fear_user_id", USER_ID);
}

// Unique session (per open)
const SESSION_SEED = Math.floor(Math.random() * 1000000);

// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// World state
const WORLD = {
  chaos: 0,
  pulse: 0
};

// Input = chaos
window.addEventListener("keydown", () => {
  WORLD.chaos = Math.min(WORLD.chaos + 0.3, 3);
});

// Spiral logic
let angleOffset = Math.random() * Math.PI * 2;

function draw() {
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

  for (let i = 0; i < 600; i++) {
    const angle = i * 0.15 + angleOffset;
    const radius = i * 0.45;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    ctx.lineTo(x, y);
  }

  ctx.stroke();

  // UI
  ctx.fillStyle = "rgba(255,80,80,0.6)";
  ctx.font = "12px monospace";
  ctx.fillText("FEAR v" + APP_VERSION, 20, 20);
  ctx.fillText("id: " + USER_ID, 20, 36);

  angleOffset += 0.002;
  WORLD.chaos *= 0.96;
}

// Loop
function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();
