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
      
      <div class="form-group">
        <label class="form-label">Tipo Partita</label>
        <select v-model="matchType" class="form-input">
          <option value="friendly">Amichevole</option>
          <option value="tournament">Torneo</option>
          <option value="championship">Campionato</option>
        </select>
      </div>
      
      <div class="teams-setup">
        <div class="team-section">
          <h3 class="text-pixel">Team Home</h3>
          <input v-model="teamHomeName" class="form-input" placeholder="Nome squadra casa">
        </div>
        
        <div class="vs-section">
          <span class="vs-text text-pixel">VS</span>
        </div>
        
        <div class="team-section">
          <h3 class="text-pixel">Team Away</h3>
          <input v-model="teamAwayName" class="form-input" placeholder="Nome squadra ospite">
        </div>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" @click="createMatch">
          🎮 Crea Partita
        </button>
        <router-link to="/" class="btn btn-secondary">
          ← Torna alla Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NewMatch',
  setup() {
    const router = useRouter()
    const matchType = ref('friendly')
    const teamHomeName = ref('')
    const teamAwayName = ref('')
    
    const createMatch = () => {
      if (!teamHomeName.value || !teamAwayName.value) {
        alert('❌ Inserisci i nomi delle squadre!')
        return
      }
      
      alert('🎮 Partita creata con successo!')
      router.push('/')
    }
    
    return {
      matchType,
      teamHomeName,
      teamAwayName,
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
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.teams-setup {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-md);
  align-items: center;
  margin: var(--spacing-lg) 0;
}

.vs-section {
  text-align: center;
}

.vs-text {
  font-size: 2rem;
  color: var(--primary-green);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-xl);
}

@media (max-width: 768px) {
  .teams-setup {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
