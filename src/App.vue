<template>
  <div id="app" class="app-container">
    <!-- Header retro-nerd -->
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <!-- Logo/Title -->
          <div class="logo-section">
            <h1 class="app-title neon-glow">
              ⚽ LodeStat
            </h1>
            <p class="subtitle text-mono">
              >> Lodestar Foosball Analytics v1.0
            </p>
          </div>
          
          <!-- System Info (retro terminal style) -->
          <div class="system-info">
            <span class="text-mono">
              [{{ currentTime }}] | Total Games: {{ totalGames }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation retro-style -->
    <nav class="app-nav">
      <div class="container">
        <ul class="nav-menu">
          <li v-for="route in navRoutes" :key="route.name" class="nav-item">
            <router-link
              :to="route.path"
              class="nav-link"
              :class="{ active: $route.name === route.name }"
              @click="playNavSound"
            >
              <span class="nav-icon">{{ route.icon }}</span>
              <span class="nav-text">{{ route.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="app-main">
      <div class="container">
        <!-- Page transition with retro effect -->
        <transition name="fade" mode="out-in">
          <router-view v-slot="{ Component }">
            <div class="page-wrapper scanlines">
              <component :is="Component" />
            </div>
          </router-view>
        </transition>
      </div>
    </main>

    <!-- Footer retro -->
    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-left">
            <p class="text-mono">
              &copy; 2025 Lodestar Team | LodeStat v1.0
            </p>
          </div>
          <div class="footer-right">
            <span class="text-mono">
              Made with 💚 & 🎮 by nerds
            </span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Matrix rain effect overlay -->
    <div class="matrix-overlay" ref="matrixCanvas"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const currentTime = ref('')
    const totalGames = ref(247)
    const matrixCanvas = ref(null)
    
    // Navigation routes
    const navRoutes = [
      { name: 'Dashboard', path: '/', label: 'Dashboard', icon: '🏠' },
      { name: 'Players', path: '/players', label: 'Players', icon: '👥' },
      { name: 'Matches', path: '/matches', label: 'Matches', icon: '🏓' },
      { name: 'Stats', path: '/stats', label: 'Stats', icon: '📊' },
      { name: 'NewMatch', path: '/new-match', label: 'New Game', icon: '🎮' }
    ]

    // Update current time
    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleTimeString('it-IT', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
    }

    // Play navigation sound
    const playNavSound = () => {
      // Simple retro beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()
      
      oscillator.connect(gain)
      gain.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'square'
      
      gain.gain.setValueAtTime(0.1, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }

    // Matrix rain effect
    const createMatrixEffect = () => {
      if (!matrixCanvas.value) return
      
      const canvas = document.createElement('canvas')
      matrixCanvas.value.appendChild(canvas)
      
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const chars = '01⚽🎮🏆👾💚'
      const matrix = chars.split('')
      const font_size = 10
      const columns = canvas.width / font_size
      const drops = []
      
      for (let x = 0; x < columns; x++) {
        drops[x] = 1
      }
      
      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = '#00ff41'
        ctx.font = font_size + 'px monospace'
        
        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * font_size, drops[i] * font_size)
          
          if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }
      
      const interval = setInterval(draw, 35)
      return () => clearInterval(interval)
    }

    let timeInterval
    let matrixCleanup

    onMounted(() => {
      updateTime()
      timeInterval = setInterval(updateTime, 1000)
      
      // Start matrix effect after a delay
      setTimeout(() => {
        matrixCleanup = createMatrixEffect()
      }, 1000)
    })

    onUnmounted(() => {
      if (timeInterval) clearInterval(timeInterval)
      if (matrixCleanup) matrixCleanup()
    })

    return {
      currentTime,
      totalGames,
      navRoutes,
      matrixCanvas,
      playNavSound
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.app-header {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(26, 26, 46, 0.9));
  border-bottom: 2px solid var(--primary-green);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.logo-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.app-title {
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 2rem);
  color: var(--primary-green);
  text-shadow: var(--shadow-neon);
}

.subtitle {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
}

.system-info {
  font-size: 0.7rem;
  color: var(--neon-blue);
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--neon-blue);
  border-radius: var(--radius-sm);
  background: rgba(0, 212, 255, 0.1);
}

/* Navigation Styles */
.app-nav {
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid var(--primary-green);
  padding: var(--spacing-sm) 0;
  position: sticky;
  top: 80px;
  z-index: 99;
  backdrop-filter: blur(5px);
}

.nav-menu {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  font-family: var(--font-pixel);
  font-size: 0.6rem;
  text-transform: uppercase;
}

.nav-link:hover {
  color: var(--primary-green);
  border-color: var(--primary-green);
  background: rgba(0, 255, 65, 0.1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-neon);
}

.nav-link.active {
  color: var(--text-white);
  background: var(--primary-green);
  border-color: var(--primary-green);
  box-shadow: var(--shadow-neon);
}

.nav-icon {
  font-size: 1rem;
}

.nav-text {
  font-size: 0.6rem;
}

/* Main Content */
.app-main {
  flex: 1;
  padding: var(--spacing-xl) 0;
  position: relative;
}

.page-wrapper {
  position: relative;
  min-height: 400px;
}

/* Footer */
.app-footer {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(26, 26, 46, 0.9));
  border-top: 1px solid var(--primary-green);
  padding: var(--spacing-md) 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  font-size: 0.7rem;
}

/* Matrix Overlay */
.matrix-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-menu {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .nav-link {
    width: 100%;
    justify-content: center;
    max-width: 200px;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .app-nav {
    position: relative;
    top: auto;
  }
  
  .app-header {
    position: relative;
  }
}

/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
