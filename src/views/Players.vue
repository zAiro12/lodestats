<template>
  <div class="players">
    <div class="page-header">
      <h1 class="page-title text-pixel">👥 Players Database</h1>
      <p class="page-subtitle text-cyber">
        >> Gestione giocatori Lodestar Foosball League
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="stats-grid grid-3 mb-lg">
      <div class="stat-card card neon-glow">
        <div class="stat-icon">👤</div>
        <div class="stat-info">
          <span class="stat-number">{{ totalPlayers }}</span>
          <span class="stat-label">Giocatori Totali</span>
        </div>
      </div>
      
      <div class="stat-card card neon-glow">
        <div class="stat-icon">🏃</div>
        <div class="stat-info">
          <span class="stat-number">{{ activePlayers }}</span>
          <span class="stat-label">Attivi Questo Mese</span>
        </div>
      </div>
      
      <div class="stat-card card neon-glow">
        <div class="stat-icon">⭐</div>
        <div class="stat-info">
          <span class="stat-number">{{ avgRating }}</span>
          <span class="stat-label">Rating Medio</span>
        </div>
      </div>
    </div>

    <!-- Add Player Button -->
    <div class="actions-bar mb-lg">
      <button class="btn btn-primary" @click="showAddPlayer = true">
        <span>🎮</span> Aggiungi Nuovo Giocatore
      </button>
      <button class="btn btn-secondary" @click="exportPlayers">
        <span>📊</span> Esporta Dati
      </button>
    </div>

    <!-- Players List -->
    <div class="players-list">
      <div v-for="player in players" :key="player.id" class="player-card card">
        <div class="player-avatar">
          <span class="avatar-text">{{ getInitials(player.name) }}</span>
        </div>
        
        <div class="player-info">
          <h3 class="player-name">{{ player.name }}</h3>
          <p class="player-role">{{ player.role }}</p>
          <div class="player-meta text-mono">
            Iscritto: {{ formatDate(player.joinDate) }}
          </div>
        </div>
        
        <div class="player-stats">
          <div class="stat">
            <span class="stat-label">Partite</span>
            <span class="stat-value">{{ player.matches }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Vittorie</span>
            <span class="stat-value">{{ player.wins }}</span>
          </div>
        </div>
        
        <div class="player-rating">
          <span class="rating-label">Rating</span>
          <span class="rating-value neon-glow">{{ player.rating }}</span>
        </div>
        
        <div class="player-actions">
          <button class="btn-icon" @click="editPlayer(player)" title="Modifica">
            ✏️
          </button>
          <button class="btn-icon" @click="viewPlayerStats(player)" title="Statistiche">
            📊
          </button>
        </div>
      </div>
    </div>

    <!-- Add Player Modal (placeholder) -->
    <div v-if="showAddPlayer" class="modal-overlay" @click="showAddPlayer = false">
      <div class="modal card" @click.stop>
        <h2 class="text-pixel">🎮 Nuovo Giocatore</h2>
        <p class="text-cyber">Funzionalità in arrivo...</p>
        <button class="btn btn-primary" @click="showAddPlayer = false">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Players',
  setup() {
    const showAddPlayer = ref(false)
    const totalPlayers = ref(24)
    const activePlayers = ref(18)
    const avgRating = ref(7.8)
    
    const players = ref([
      { id: 1, name: 'Marco Rossi', role: 'Pro Player', joinDate: '2024-01-15', matches: 45, wins: 32, rating: 9.2 },
      { id: 2, name: 'Luca Verdi', role: 'Veteran', joinDate: '2024-02-20', matches: 42, wins: 28, rating: 8.9 },
      { id: 3, name: 'Paolo Bianchi', role: 'Regular', joinDate: '2024-01-10', matches: 38, wins: 25, rating: 8.7 },
      { id: 4, name: 'Andrea Neri', role: 'Pro Player', joinDate: '2024-03-05', matches: 40, wins: 22, rating: 8.5 },
      { id: 5, name: 'Giulio Blu', role: 'Rookie', joinDate: '2024-01-25', matches: 35, wins: 19, rating: 8.3 },
      { id: 6, name: 'Francesco Giallo', role: 'Regular', joinDate: '2024-02-15', matches: 32, wins: 17, rating: 8.1 }
    ])
    
    const getInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('it-IT')
    }
    
    const editPlayer = (player) => {
      alert(`✏️ Modifica giocatore: ${player.name}`)
    }
    
    const viewPlayerStats = (player) => {
      alert(`📊 Statistiche di: ${player.name}`)
    }
    
    const exportPlayers = () => {
      alert('📊 Export funzionalità in arrivo!')
    }
    
    return {
      showAddPlayer,
      totalPlayers,
      activePlayers,
      avgRating,
      players,
      getInitials,
      formatDate,
      editPlayer,
      viewPlayerStats,
      exportPlayers
    }
  }
}
</script>

<style scoped>
.players {
  padding: var(--spacing-lg) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: clamp(1.2rem, 4vw, 2rem);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.stats-grid {
  margin-bottom: var(--spacing-lg);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: var(--font-pixel);
  font-size: 1.5rem;
  color: var(--primary-green);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  color: var(--text-muted);
  text-transform: uppercase;
}

.actions-bar {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.players-list {
  display: grid;
  gap: var(--spacing-md);
}

.player-card {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-md);
}

.player-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-green);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: var(--font-pixel);
  font-size: 0.8rem;
  font-weight: bold;
}

.player-name {
  font-family: var(--font-pixel);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xs);
  color: var(--primary-green);
}

.player-role {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.player-meta {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.player-stats {
  display: flex;
  gap: var(--spacing-md);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-value {
  font-family: var(--font-pixel);
  font-size: 0.8rem;
  color: var(--text-white);
}

.player-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.rating-label {
  font-size: 0.6rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.rating-value {
  font-family: var(--font-pixel);
  font-size: 1rem;
  color: var(--primary-green);
}

.player-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.btn-icon {
  background: none;
  border: 1px solid var(--primary-green);
  color: var(--primary-green);
  width: 35px;
  height: 35px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: var(--primary-green);
  color: #000;
  transform: scale(1.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  padding: var(--spacing-xl);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

@media (max-width: 768px) {
  .player-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-sm);
  }
  
  .player-stats {
    justify-content: center;
  }
  
  .actions-bar {
    justify-content: center;
  }
}
</style>
