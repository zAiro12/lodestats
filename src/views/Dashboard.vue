<template>
  <div class="dashboard">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title text-pixel">
          🎮 Welcome to LodeStat
        </h1>
        <p class="hero-subtitle text-cyber">
          >> Sistema di tracking partite calcio balilla Lodestar
        </p>
        <div class="hero-stats">
          <div class="stat-item neon-glow">
            <span class="stat-number">{{ totalMatches }}</span>
            <span class="stat-label">Partite Giocate</span>
          </div>
          <div class="stat-item neon-glow">
            <span class="stat-number">{{ activePlayers }}</span>
            <span class="stat-label">Giocatori Attivi</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="quick-actions">
      <h2 class="section-title text-pixel">⚡ Quick Actions</h2>
      <div class="action-grid">
        <router-link to="/new-match" class="action-card card">
          <div class="action-icon">🎮</div>
          <h3>Nuova Partita</h3>
          <p>Registra una nuova partita di calcio balilla</p>
        </router-link>
        
        <router-link to="/players" class="action-card card">
          <div class="action-icon">👥</div>
          <h3>Gestisci Giocatori</h3>
          <p>Visualizza e modifica i profili giocatori</p>
        </router-link>
        
        <router-link to="/stats" class="action-card card">
          <div class="action-icon">📊</div>
          <h3>Statistiche</h3>
          <p>Analizza le performance e classifiche</p>
        </router-link>
        
        <div class="action-card card" @click="generateReport">
          <div class="action-icon">📋</div>
          <h3>Report</h3>
          <p>Genera report mensile automatico</p>
        </div>
      </div>
    </section>

    <!-- Recent Matches -->
    <section class="recent-matches">
      <h2 class="section-title text-pixel">🕹️ Partite Recenti</h2>
      <div class="matches-container">
        <div v-for="match in recentMatches" :key="match.id" class="match-card card">
          <div class="match-header">
            <span class="match-date text-mono">{{ formatDate(match.date) }}</span>
            <span class="match-type" :class="match.type">{{ match.type.toUpperCase() }}</span>
          </div>
          
          <div class="match-teams">
            <div class="team team-home">
              <div class="team-name">{{ match.teamHome.name }}</div>
              <div class="team-players">
                <span v-for="player in match.teamHome.players" :key="player" class="player-tag">
                  {{ player }}
                </span>
              </div>
            </div>
            
            <div class="match-score">
              <span class="score-home">{{ match.scoreHome }}</span>
              <span class="score-separator">-</span>
              <span class="score-away">{{ match.scoreAway }}</span>
            </div>
            
            <div class="team team-away">
              <div class="team-name">{{ match.teamAway.name }}</div>
              <div class="team-players">
                <span v-for="player in match.teamAway.players" :key="player" class="player-tag">
                  {{ player }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="match-footer">
            <span class="match-duration text-mono">⏱️ {{ match.duration }}min</span>
          </div>
        </div>
      </div>
      
      <div class="view-all-matches">
        <router-link to="/matches" class="btn btn-primary">
          Vedi Tutte le Partite >>
        </router-link>
      </div>
    </section>

    <!-- System Status (retro terminal style) -->
    <section class="system-status">
      <h2 class="section-title text-pixel">💻 System Status</h2>
      <div class="terminal-window card">
        <div class="terminal-header">
          <span class="terminal-title">LodeStat Terminal v1.0</span>
          <div class="terminal-controls">
            <span class="control minimize"></span>
            <span class="control maximize"></span>
            <span class="control close"></span>
          </div>
        </div>
        <div class="terminal-body">
          <div class="terminal-line">
            <span class="prompt">lodestat@server:~$</span>
            <span class="command">system status</span>
          </div>
          <div class="terminal-output">
            <div class="status-line">
              <span class="status-key">Database:</span>
              <span class="status-value success">● ONLINE</span>
            </div>
            <div class="status-line">
              <span class="status-key">API Server:</span>
              <span class="status-value success">● RUNNING</span>
            </div>
            <div class="status-line">
              <span class="status-key">Last Backup:</span>
              <span class="status-value">{{ lastBackup }}</span>
            </div>
            <div class="status-line">
              <span class="status-key">Uptime:</span>
              <span class="status-value">{{ systemUptime }}</span>
            </div>
          </div>
          <div class="terminal-line">
            <span class="prompt">lodestat@server:~$</span>
            <span class="cursor">█</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Dashboard',
  setup() {
    // Reactive data
    const totalMatches = ref(247)
    const activePlayers = ref(18)
    const lastBackup = ref('23/07/2025 14:30')
    const systemUptime = ref('12d 8h 42m')
    
    // Sample data for recent matches
    const recentMatches = ref([
      {
        id: 1,
        date: '2025-07-23T16:30:00',
        type: 'friendly',
        teamHome: {
          name: 'Team Alpha',
          players: ['Marco', 'Luca', 'Andrea']
        },
        teamAway: {
          name: 'Team Beta',
          players: ['Paolo', 'Giulio', 'Francesco']
        },
        scoreHome: 3,
        scoreAway: 2,
        duration: 45
      },
      {
        id: 2,
        date: '2025-07-23T14:15:00',
        type: 'tournament',
        teamHome: {
          name: 'Developers',
          players: ['Simone', 'Roberto', 'Alessandro']
        },
        teamAway: {
          name: 'Designers',
          players: ['Matteo', 'Lorenzo', 'Davide']
        },
        scoreHome: 1,
        scoreAway: 4,
        duration: 50
      },
      {
        id: 3,
        date: '2025-07-22T18:00:00',
        type: 'friendly',
        teamHome: {
          name: 'Veterans',
          players: ['Giuseppe', 'Antonio', 'Stefano']
        },
        teamAway: {
          name: 'Rookies',
          players: ['Tommaso', 'Federico', 'Riccardo']
        },
        scoreHome: 2,
        scoreAway: 2,
        duration: 40
      }
    ])
    
    // Methods
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const generateReport = () => {
      // Simulate report generation with retro sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()
      
      oscillator.connect(gain)
      gain.connect(audioContext.destination)
      
      oscillator.frequency.value = 1000
      oscillator.type = 'square'
      
      gain.gain.setValueAtTime(0.1, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
      
      alert('📋 Report generato con successo! 🎮')
    }
    
    return {
      totalMatches,
      activePlayers,
      lastBackup,
      systemUptime,
      recentMatches,
      formatDate,
      generateReport
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: var(--spacing-lg) 0;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: var(--spacing-xxl) 0;
  background: linear-gradient(45deg, rgba(0, 255, 65, 0.1), rgba(0, 212, 255, 0.1));
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: clamp(1.5rem, 5vw, 3rem);
  margin-bottom: var(--spacing-md);
  color: var(--primary-green);
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  margin-bottom: var(--spacing-xl);
  color: var(--text-secondary);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md);
  border: 1px solid var(--primary-green);
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.5);
  min-width: 120px;
}

.stat-number {
  font-family: var(--font-pixel);
  font-size: 2rem;
  color: var(--primary-green);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

/* Sections */
.section-title {
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: var(--spacing-lg);
  color: var(--primary-green);
  border-bottom: 2px solid var(--primary-green);
  padding-bottom: var(--spacing-sm);
}

/* Quick Actions */
.quick-actions {
  margin-bottom: var(--spacing-xl);
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.action-card {
  padding: var(--spacing-lg);
  text-align: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  display: block;
}

.action-card h3 {
  font-family: var(--font-pixel);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
  color: var(--primary-green);
}

.action-card p {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Recent Matches */
.recent-matches {
  margin-bottom: var(--spacing-xl);
}

.matches-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.match-card {
  padding: var(--spacing-md);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--primary-green);
}

.match-date {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.match-type {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-family: var(--font-pixel);
  text-transform: uppercase;
}

.match-type.friendly {
  background: rgba(0, 255, 65, 0.2);
  color: var(--primary-green);
  border: 1px solid var(--primary-green);
}

.match-type.tournament {
  background: rgba(255, 102, 0, 0.2);
  color: var(--warning-orange);
  border: 1px solid var(--warning-orange);
}

.match-teams {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-md);
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.team {
  text-align: center;
}

.team-home {
  text-align: left;
}

.team-away {
  text-align: right;
}

.team-name {
  font-family: var(--font-pixel);
  font-size: 0.8rem;
  color: var(--primary-green);
  margin-bottom: var(--spacing-xs);
}

.team-players {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: inherit;
}

.player-tag {
  font-size: 0.6rem;
  padding: 2px 6px;
  background: rgba(0, 212, 255, 0.2);
  color: var(--neon-blue);
  border-radius: var(--radius-sm);
  border: 1px solid var(--neon-blue);
}

.match-score {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-pixel);
  font-size: 1.5rem;
  color: var(--text-white);
}

.score-separator {
  color: var(--text-muted);
}

.match-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  color: var(--text-secondary);
  border-top: 1px solid rgba(0, 255, 65, 0.3);
  padding-top: var(--spacing-sm);
}

.match-mvp {
  color: var(--warning-orange);
}

.view-all-matches {
  text-align: center;
}

/* Terminal Window */
.system-status {
  margin-bottom: var(--spacing-xl);
}

.terminal-window {
  background: #000;
  border: 2px solid var(--primary-green);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-neon);
}

.terminal-header {
  background: var(--primary-green);
  color: #000;
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.terminal-title {
  font-family: var(--font-pixel);
  font-size: 0.7rem;
  font-weight: bold;
}

.terminal-controls {
  display: flex;
  gap: var(--spacing-xs);
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #000;
}

.minimize { background: #ffff00; }
.maximize { background: #00ff00; }
.close { background: #ff0000; }

.terminal-body {
  padding: var(--spacing-md);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.4;
}

.terminal-line {
  margin-bottom: var(--spacing-sm);
}

.prompt {
  color: var(--primary-green);
  margin-right: var(--spacing-sm);
}

.command {
  color: var(--text-white);
}

.terminal-output {
  margin: var(--spacing-md) 0;
  padding-left: var(--spacing-md);
}

.status-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
}

.status-key {
  color: var(--text-secondary);
}

.status-value {
  color: var(--text-white);
}

.status-value.success {
  color: var(--primary-green);
}

.cursor {
  color: var(--primary-green);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-stats {
    gap: var(--spacing-md);
  }
  
  .stat-item {
    min-width: 100px;
    padding: var(--spacing-sm);
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .match-teams {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
    text-align: center;
  }
  
  .team-home,
  .team-away {
    text-align: center;
  }
  
  .team-players {
    justify-content: center;
  }
  
  .match-score {
    justify-content: center;
    order: -1;
    margin-bottom: var(--spacing-md);
  }
  
  .players-grid {
    grid-template-columns: 1fr;
  }
  
  .player-stats {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
