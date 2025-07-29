<template>
  <div class="new-match">
    <div class="page-header">
      <h1 class="page-title text-pixel">🎮 Nuova Partita</h1>
      <p class="page-subtitle text-cyber">
        >> Registra una nuova partita di calcetto-balilla
      </p>
    </div>

    <div class="match-form card">
      <h2 class="text-pixel">⚽ Match Setup</h2>
      
      <!-- Team A -->
      <div class="team-section">
        <h3 class="text-pixel">🔴 Team A</h3>
        <div class="players-selection">
          <div class="player-input">
            <label class="form-label">Giocatore 1 *</label>
            <div class="autocomplete-container">
              <input 
                v-model="teamA.player1.search"
                @input="searchPlayers('A', 1)"
                @focus="showSuggestions('A', 1)"
                @blur="hideSuggestions('A', 1)"
                class="form-input"
                placeholder="Cerca giocatore..."
                autocomplete="off"
              >
              <div 
                v-if="teamA.player1.showSuggestions && filteredPlayers.length > 0" 
                class="suggestions-dropdown"
              >
                <div 
                  v-for="player in filteredPlayers" 
                  :key="player._id"
                  @mousedown="selectPlayer('A', 1, player)"
                  class="suggestion-item"
                >
                  <strong>{{ player.nomeCompleto }}</strong>
                  <span class="player-company">{{ player.azienda }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="player-input">
            <label class="form-label">Giocatore 2 (opzionale)</label>
            <div class="autocomplete-container">
              <input 
                v-model="teamA.player2.search"
                @input="searchPlayers('A', 2)"
                @focus="showSuggestions('A', 2)"
                @blur="hideSuggestions('A', 2)"
                class="form-input"
                placeholder="Cerca giocatore..."
                autocomplete="off"
              >
              <div 
                v-if="teamA.player2.showSuggestions && filteredPlayers.length > 0" 
                class="suggestions-dropdown"
              >
                <div 
                  v-for="player in filteredPlayers" 
                  :key="player._id"
                  @mousedown="selectPlayer('A', 2, player)"
                  class="suggestion-item"
                >
                  <strong>{{ player.nomeCompleto }}</strong>
                  <span class="player-company">{{ player.azienda }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="selected-players">
          <div v-if="teamA.player1.selected" class="selected-player">
            ✓ {{ teamA.player1.selected.nomeCompleto }}
            <button @click="removePlayer('A', 1)" class="remove-btn">×</button>
          </div>
          <div v-if="teamA.player2.selected" class="selected-player">
            ✓ {{ teamA.player2.selected.nomeCompleto }}
            <button @click="removePlayer('A', 2)" class="remove-btn">×</button>
          </div>
        </div>
      </div>

      <div class="vs-section">
        <span class="vs-text text-pixel">VS</span>
      </div>

      <!-- Team B -->
      <div class="team-section">
        <h3 class="text-pixel">🔵 Team B</h3>
        <div class="players-selection">
          <div class="player-input">
            <label class="form-label">Giocatore 1 *</label>
            <div class="autocomplete-container">
              <input 
                v-model="teamB.player1.search"
                @input="searchPlayers('B', 1)"
                @focus="showSuggestions('B', 1)"
                @blur="hideSuggestions('B', 1)"
                class="form-input"
                placeholder="Cerca giocatore..."
                autocomplete="off"
              >
              <div 
                v-if="teamB.player1.showSuggestions && filteredPlayers.length > 0" 
                class="suggestions-dropdown"
              >
                <div 
                  v-for="player in filteredPlayers" 
                  :key="player._id"
                  @mousedown="selectPlayer('B', 1, player)"
                  class="suggestion-item"
                >
                  <strong>{{ player.nomeCompleto }}</strong>
                  <span class="player-company">{{ player.azienda }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="player-input">
            <label class="form-label">Giocatore 2 (opzionale)</label>
            <div class="autocomplete-container">
              <input 
                v-model="teamB.player2.search"
                @input="searchPlayers('B', 2)"
                @focus="showSuggestions('B', 2)"
                @blur="hideSuggestions('B', 2)"
                class="form-input"
                placeholder="Cerca giocatore..."
                autocomplete="off"
              >
              <div 
                v-if="teamB.player2.showSuggestions && filteredPlayers.length > 0" 
                class="suggestions-dropdown"
              >
                <div 
                  v-for="player in filteredPlayers" 
                  :key="player._id"
                  @mousedown="selectPlayer('B', 2, player)"
                  class="suggestion-item"
                >
                  <strong>{{ player.nomeCompleto }}</strong>
                  <span class="player-company">{{ player.azienda }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="selected-players">
          <div v-if="teamB.player1.selected" class="selected-player">
            ✓ {{ teamB.player1.selected.nomeCompleto }}
            <button @click="removePlayer('B', 1)" class="remove-btn">×</button>
          </div>
          <div v-if="teamB.player2.selected" class="selected-player">
            ✓ {{ teamB.player2.selected.nomeCompleto }}
            <button @click="removePlayer('B', 2)" class="remove-btn">×</button>
          </div>
        </div>
      </div>

      <!-- Scores -->
      <div class="scores-section">
        <h3 class="text-pixel">🏆 Punteggi</h3>
        <div class="scores-input">
          <div class="score-input">
            <label class="form-label">Team A</label>
            <input 
              v-model.number="scoreA" 
              type="number" 
              min="0" 
              max="50" 
              class="form-input score-field"
              placeholder="0"
            >
          </div>
          <div class="score-separator">-</div>
          <div class="score-input">
            <label class="form-label">Team B</label>
            <input 
              v-model.number="scoreB" 
              type="number" 
              min="0" 
              max="50" 
              class="form-input score-field"
              placeholder="0"
            >
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button 
          class="btn btn-primary" 
          @click="createMatch"
          :disabled="!canCreateMatch || isLoading"
        >
          <span v-if="isLoading">🔄 Salvando...</span>
          <span v-else>🎮 Crea Partita</span>
        </button>
        <router-link to="/" class="btn btn-secondary">
          ← Torna alla Dashboard
        </router-link>
      </div>

      <!-- Loading/Error Messages -->
      <div v-if="message" class="message" :class="message.type">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'NewMatch',
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const message = ref(null)
    const allPlayers = ref([])
    const filteredPlayers = ref([])
    
    // Team structures
    const teamA = ref({
      player1: { search: '', selected: null, showSuggestions: false },
      player2: { search: '', selected: null, showSuggestions: false }
    })
    
    const teamB = ref({
      player1: { search: '', selected: null, showSuggestions: false },
      player2: { search: '', selected: null, showSuggestions: false }
    })
    
    const scoreA = ref(0)
    const scoreB = ref(0)
    
    // Computed properties
    const canCreateMatch = computed(() => {
      return teamA.value.player1.selected && 
             teamB.value.player1.selected && 
             scoreA.value >= 0 && 
             scoreB.value >= 0
    })
    
    // Load players on component mount
    onMounted(async () => {
      await loadPlayers()
    })
    
    const loadPlayers = async () => {
      try {
        const response = await axios.get('/api/players')
        if (response.data.success) {
          allPlayers.value = response.data.data
        }
      } catch (error) {
        console.error('Errore nel caricamento giocatori:', error)
        showMessage('Errore nel caricamento giocatori', 'error')
      }
    }
    
    const searchPlayers = (team, playerNum) => {
      const searchTerm = team === 'A' 
        ? teamA.value[`player${playerNum}`].search 
        : teamB.value[`player${playerNum}`].search
      
      if (searchTerm.length < 2) {
        filteredPlayers.value = []
        return
      }
      
      // Get already selected players to exclude them
      const selectedPlayerIds = getSelectedPlayerIds()
      
      filteredPlayers.value = allPlayers.value
        .filter(player => {
          const fullName = player.nomeCompleto.toLowerCase()
          const search = searchTerm.toLowerCase()
          const isAlreadySelected = selectedPlayerIds.includes(player._id)
          return fullName.includes(search) && !isAlreadySelected
        })
        .slice(0, 10) // Limit to 10 suggestions
    }
    
    const getSelectedPlayerIds = () => {
      const ids = []
      if (teamA.value.player1.selected) ids.push(teamA.value.player1.selected._id)
      if (teamA.value.player2.selected) ids.push(teamA.value.player2.selected._id)
      if (teamB.value.player1.selected) ids.push(teamB.value.player1.selected._id)
      if (teamB.value.player2.selected) ids.push(teamB.value.player2.selected._id)
      return ids
    }
    
    const showSuggestions = (team, playerNum) => {
      if (team === 'A') {
        teamA.value[`player${playerNum}`].showSuggestions = true
      } else {
        teamB.value[`player${playerNum}`].showSuggestions = true
      }
    }
    
    const hideSuggestions = (team, playerNum) => {
      setTimeout(() => {
        if (team === 'A') {
          teamA.value[`player${playerNum}`].showSuggestions = false
        } else {
          teamB.value[`player${playerNum}`].showSuggestions = false
        }
      }, 150) // Delay to allow click on suggestions
    }
    
    const selectPlayer = (team, playerNum, player) => {
      if (team === 'A') {
        teamA.value[`player${playerNum}`].selected = player
        teamA.value[`player${playerNum}`].search = player.nomeCompleto
        teamA.value[`player${playerNum}`].showSuggestions = false
      } else {
        teamB.value[`player${playerNum}`].selected = player
        teamB.value[`player${playerNum}`].search = player.nomeCompleto
        teamB.value[`player${playerNum}`].showSuggestions = false
      }
      filteredPlayers.value = []
    }
    
    const removePlayer = (team, playerNum) => {
      if (team === 'A') {
        teamA.value[`player${playerNum}`].selected = null
        teamA.value[`player${playerNum}`].search = ''
      } else {
        teamB.value[`player${playerNum}`].selected = null
        teamB.value[`player${playerNum}`].search = ''
      }
    }
    
    const createMatch = async () => {
      if (!canCreateMatch.value) {
        showMessage('Compila tutti i campi obbligatori', 'error')
        return
      }
      
      isLoading.value = true
      
      try {
        // Prepare match data
        const matchData = {
          teamA: [teamA.value.player1.selected._id],
          teamB: [teamB.value.player1.selected._id],
          scoreA: scoreA.value,
          scoreB: scoreB.value
        }
        
        // Add second players if selected
        if (teamA.value.player2.selected) {
          matchData.teamA.push(teamA.value.player2.selected._id)
        }
        if (teamB.value.player2.selected) {
          matchData.teamB.push(teamB.value.player2.selected._id)
        }
        
        const response = await axios.post('/api/matches', matchData)
        
        if (response.data.success) {
          showMessage('Partita creata con successo!', 'success')
          setTimeout(() => {
            router.push('/')
          }, 1500)
        }
      } catch (error) {
        console.error('Errore nella creazione della partita:', error)
        const errorMessage = error.response?.data?.message || 'Errore nella creazione della partita'
        showMessage(errorMessage, 'error')
      } finally {
        isLoading.value = false
      }
    }
    
    const showMessage = (text, type) => {
      message.value = { text, type }
      setTimeout(() => {
        message.value = null
      }, 5000)
    }
    
    return {
      teamA,
      teamB,
      scoreA,
      scoreB,
      isLoading,
      message,
      filteredPlayers,
      canCreateMatch,
      searchPlayers,
      showSuggestions,
      hideSuggestions,
      selectPlayer,
      removePlayer,
      createMatch
    }
  }
}
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.match-form {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.team-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.1);
  border-radius: var(--border-radius);
}

.team-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--primary-green);
}

.players-selection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.player-input {
  position: relative;
}

.autocomplete-container {
  position: relative;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-dark);
  border: 1px solid var(--primary-green);
  border-radius: var(--border-radius);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.suggestion-item {
  padding: var(--spacing-sm);
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 255, 0, 0.1);
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: rgba(0, 255, 0, 0.1);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.player-company {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.selected-players {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.selected-player {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid var(--primary-green);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.9rem;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--danger-red);
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: rgba(255, 0, 0, 0.1);
}

.vs-section {
  text-align: center;
  margin: var(--spacing-lg) 0;
}

.vs-text {
  font-size: 2rem;
  color: var(--primary-green);
  text-shadow: 0 0 10px var(--primary-green);
}

.scores-section {
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-lg);
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.1);
  border-radius: var(--border-radius);
}

.scores-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--primary-green);
  text-align: center;
}

.scores-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
}

.score-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.score-field {
  width: 80px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.score-separator {
  font-size: 2rem;
  color: var(--primary-green);
  font-weight: bold;
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-xl);
}

.message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  text-align: center;
  font-weight: bold;
}

.message.success {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid var(--primary-green);
  color: var(--primary-green);
}

.message.error {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid var(--danger-red);
  color: var(--danger-red);
}

@media (max-width: 768px) {
  .players-selection {
    grid-template-columns: 1fr;
  }
  
  .scores-input {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .actions {
    flex-direction: column;
  }
  
  .match-form {
    padding: var(--spacing-md);
  }
}
</style>
