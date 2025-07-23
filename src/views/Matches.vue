<template>
  <div class="matches">
    <div class="page-header">
      <h1 class="page-title text-pixel">⚽ Matches Archive</h1>
      <p class="page-subtitle text-cyber">
        >> Storico completo partite Lodestar
      </p>
    </div>

    <div class="matches-container">
      <div v-for="match in matches" :key="match.id" class="match-card card">
        <div class="match-header">
          <span class="match-date text-mono">{{ formatDate(match.date) }}</span>
          <span class="match-type" :class="match.type">{{ match.type.toUpperCase() }}</span>
        </div>
        
        <div class="match-content">
          <div class="team">{{ match.teamHome.name }}</div>
          <div class="score">{{ match.scoreHome }} - {{ match.scoreAway }}</div>
          <div class="team">{{ match.teamAway.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Matches',
  setup() {
    const matches = ref([
      {
        id: 1,
        date: '2025-07-23T16:30:00',
        type: 'friendly',
        teamHome: { name: 'Team Alpha' },
        teamAway: { name: 'Team Beta' },
        scoreHome: 3,
        scoreAway: 2
      }
    ])
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('it-IT')
    }
    
    return { matches, formatDate }
  }
}
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.match-card {
  margin-bottom: var(--spacing-md);
}

.match-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.match-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-md);
  align-items: center;
  text-align: center;
}

.score {
  font-family: var(--font-pixel);
  font-size: 1.5rem;
  color: var(--primary-green);
}
</style>
