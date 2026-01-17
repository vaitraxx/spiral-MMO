// ===== APP CORE =====
const APP_VERSION = "0.1.0";

// USER ID (per device)
let USER_ID = localStorage.getItem("fear_user_id");
if (!USER_ID) {
  USER_ID = "user_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem("fear_user_id", USER_ID);
}

// SESSION ID (per open)
const SESSION_SEED = Math.floor(Math.random() * 1000000);

// WORLD STATE
const WORLD = {
  word: "awakening",
  chaos: 0,
  timePulse: 0
};

console.log("Version:", APP_VERSION);
console.log("User:", USER_ID);
console.log("Session:", SESSION_SEED);
