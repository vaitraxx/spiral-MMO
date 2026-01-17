// =================================================
// SPIRAL — TOTAL SIMULATION (STATEMENT 3)
// Fear + Peace + Clutter + Horror + Presence
// =================================================

// ---------- SESSION ----------
const SESSION_SEED = Math.floor(Math.random() * 999999);

// ---------- CANVAS ----------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ---------- WORLD ----------
const WORLD = {
  chaos: 0,
  pulse: 0,
  tick: 0
};

// ---------- HANDS ----------
const handPaths = Array.from({ length: 9 }, (_, i) => `images/hand${i+1}.png`);
const hands = [];

function spawnHand() {
  const img = new Image();
  img.src = handPaths[Math.floor(Math.random() * handPaths.length)];

  hands.push({
    img,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    scale: 0.3 + Math.random() * 0.7,
    alpha: 0,
    life: 300 + Math.random() * 300,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

// spawn hands endlessly
setInterval(() => {
  if (hands.length < 12) spawnHand();
}, 1500);

// ---------- SPIRALS ----------
const spirals = [];
const COLORS = [
  "#1a1a2e", "#0f3460", "#53354a",
  "#2c2c2c", "#16213e", "#3a0ca3"
];

for (let i = 0; i < 6; i++) {
  spirals.push({
    angle: Math.random() * Math.PI * 2,
    speed: 0.0005 + Math.random() * 0.002,
    step: 0.25 + Math.random() * 0.4,
    color: COLORS[i % COLORS.length],
    ox: (Math.random() - 0.5) * 500,
    oy: (Math.random() - 0.5) * 500
  });
}

// ---------- TEXT DUST ----------
const dust = [];
const WORDS = [
  "sin", "desire", "fear", "peace", "touch",
  "alive", "void", "breath", "chaos", "love"
];

window.addEventListener("keydown", (e) => {
  WORLD.chaos += 0.2;

  const text = e.key.length === 1
    ? e.key
    : WORDS[Math.floor(Math.random() * WORDS.length)];

  dust.push({
    text,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: -0.5 - Math.random(),
    alpha: 1,
    size: 18 + Math.random() * 22
  });
});

// ---------- DRAW ----------
function drawSpirals() {
  spirals.forEach(s => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    const cx = canvas.width / 2 + s.ox;
    const cy = canvas.height / 2 + s.oy;

    for (let i = 0; i < 800; i++) {
      const a = i * 0.14 + s.angle;
      const r = i * s.step;
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }

    ctx.stroke();
    s.angle += s.speed + WORLD.chaos * 0.00005;
  });
}

function drawHands() {
  for (let i = hands.length - 1; i >= 0; i--) {
    const h = hands[i];

    h.alpha += 0.01;
    h.x += h.vx;
    h.y += h.vy;
    h.life--;

    ctx.globalAlpha = Math.min(h.alpha, 0.7);
    if (h.img.complete) {
      ctx.drawImage(
        h.img,
        h.x,
        h.y,
        300 * h.scale,
        300 * h.scale
      );
    }
    ctx.globalAlpha = 1;

    if (h.life <= 0) hands.splice(i, 1);
  }
}

function drawDust() {
  for (let i = dust.length - 1; i >= 0; i--) {
    const d = dust[i];
    d.x += d.vx;
    d.y += d.vy;
    d.alpha -= 0.02;

    ctx.fillStyle = `rgba(200,200,200,${d.alpha})`;
    ctx.font = `${d.size}px serif`;
    ctx.fillText(d.text, d.x, d.y);

    if (d.alpha <= 0) dust.splice(i, 1);
  }
}

// ---------- LOOP ----------
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  WORLD.pulse = Math.abs(Math.sin(Date.now() * 0.002));
  WORLD.tick++;

  drawSpirals();
  drawHands();
  drawDust();

  WORLD.chaos *= 0.96;

  requestAnimationFrame(animate);
}

animate();
