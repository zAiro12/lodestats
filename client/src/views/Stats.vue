<template>
  <div class="stats">
    <div class="page-header">
      <h1 class="page-title text-pixel">📊 Statistics Hub</h1>
      <p class="page-subtitle text-cyber">
        >> Analytics & Performance Data
      </p>
    </div>

    <div class="stats-grid grid-2">
      <div class="card">
        <h3 class="text-pixel">🏆 Più Vittorie</h3>
        <div class="stats-list">
          <div class="stat-item">Marco Rossi - 32 vittorie</div>
          <div class="stat-item">Luca Verdi - 28 vittorie</div>
          <div class="stat-item">Paolo Bianchi - 25 vittorie</div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="text-pixel">⭐ Migliori Rating</h3>
        <div class="stats-list">
          <div class="stat-item">Marco Rossi - 9.2</div>
          <div class="stat-item">Luca Verdi - 8.9</div>
          <div class="stat-item">Paolo Bianchi - 8.7</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats'
}
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.stats-list {
  padding: var(--spacing-md) 0;
}

.stat-item {
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--primary-green);
  color: var(--text-secondary);
}
</style>
