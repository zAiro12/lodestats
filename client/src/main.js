import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import "./styles/main.css";

// Import views (creeremo questi file dopo)
import Dashboard from "./views/Dashboard.vue";
import Players from "./views/Players.vue";
import Matches from "./views/Matches.vue";
import Stats from "./views/Stats.vue";
import NewMatch from "./views/NewMatch.vue";

// Router configuration
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard - LodeStat" },
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
    meta: { title: "Giocatori - LodeStat" },
  },
  {
    path: "/matches",
    name: "Matches",
    component: Matches,
    meta: { title: "Partite - LodeStat" },
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats,
    meta: { title: "Statistiche - LodeStat" },
  },
  {
    path: "/new-match",
    name: "NewMatch",
    component: NewMatch,
    meta: { title: "Nuova Partita - LodeStat" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "LodeStat ⚽";
  next();
});

// Create and mount app
const app = createApp(App);

app.use(router);

// Global properties for retro effects
app.config.globalProperties.$retro = {
  playSound: (type) => {
    // Simple beep sounds for retro feel
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    const frequencies = {
      click: 800,
      success: 1000,
      error: 400,
      notification: 600,
    };

    oscillator.frequency.value = frequencies[type] || 800;
    oscillator.type = "square";

    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  },
};

app.mount("#app");

// Add some retro console messages
console.log(`
 ██╗      ██████╗ ██████╗ ███████╗███████╗████████╗ █████╗ ████████╗
 ██║     ██╔═══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝
 ██║     ██║   ██║██║  ██║█████╗  ███████╗   ██║   ███████║   ██║   
 ██║     ██║   ██║██║  ██║██╔══╝  ╚════██║   ██║   ██╔══██║   ██║   
 ███████╗╚██████╔╝██████╔╝███████╗███████║   ██║   ██║  ██║   ██║   
 ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   
                                                                      
 🎮 RETRO FOOTBALL STATS SYSTEM v1.0
 ⚽ Sistema di tracking partite calcetto Lodestar
 🕹️ Design retro-nerd by Luca
`);

console.log(
  "%c⚡ LodeStat initialized successfully! ⚡",
  "color: #00ff41; font-family: monospace; font-size: 16px; text-shadow: 0 0 10px #00ff41;"
);
