<template>
  <div class="system-status">
    <h3>🔧 System Status</h3>
    <div class="status-grid">
      <div class="status-item">
        <div class="status-label">Database</div>
        <div class="status-value" :class="getStatusClass(status.database?.status)">
          {{ status.database?.status || 'unknown' }}
          <span v-if="status.database?.latency >= 0" class="latency">
            ({{ status.database.latency }}ms)
          </span>
        </div>
      </div>
      
      <div class="status-item">
        <div class="status-label">API Server</div>
        <div class="status-value" :class="getStatusClass(status.apiServer?.status)">
          {{ status.apiServer?.status || 'unknown' }}
        </div>
      </div>
      
      <div class="status-item">
        <div class="status-label">Last Backup</div>
        <div class="status-value">
          {{ formatBackupTime(status.backup?.lastBackup) }}
          <span :class="getBackupStatusClass(status.backup?.status)">
            {{ status.backup?.status || 'unknown' }}
          </span>
        </div>
      </div>
      
      <div class="status-item">
        <div class="status-label">Uptime</div>
        <div class="status-value uptime">
          {{ status.apiServer?.uptime || 'unknown' }}
        </div>
      </div>
    </div>
    
    <div class="status-footer">
      <span class="last-update">
        Last updated: {{ formatTime(status.timestamp) }}
      </span>
      <button @click="refreshStatus" class="refresh-btn" :disabled="loading">
        {{ loading ? '⟳' : '🔄' }} Refresh
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

export default {
  name: 'SystemStatus',
  setup() {
    const status = ref({})
    const loading = ref(false)
    let refreshInterval = null

    const fetchStatus = async () => {
      try {
        loading.value = true
        const response = await axios.get('/api/status')
        status.value = response.data
      } catch (error) {
        console.error('Failed to fetch system status:', error)
        status.value = {
          timestamp: new Date().toISOString(),
          status: 'error',
          database: { status: 'offline' },
          apiServer: { status: 'offline' },
          backup: { status: 'unknown' }
        }
      } finally {
        loading.value = false
      }
    }

    const refreshStatus = () => {
      fetchStatus()
    }

    const getStatusClass = (status) => {
      if (!status) return 'status-unknown'
      switch (status.toLowerCase()) {
        case 'online': return 'status-online'
        case 'offline': return 'status-offline'
        case 'degraded': return 'status-degraded'
        default: return 'status-unknown'
      }
    }

    const getBackupStatusClass = (backupStatus) => {
      if (!backupStatus) return 'status-unknown'
      switch (backupStatus.toLowerCase()) {
        case 'completed': return 'status-online'
        case 'failed': return 'status-offline'
        case 'running': return 'status-degraded'
        default: return 'status-unknown'
      }
    }

    const formatTime = (timestamp) => {
      if (!timestamp) return 'unknown'
      const date = new Date(timestamp)
      return date.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    const formatBackupTime = (timestamp) => {
      if (!timestamp) return 'unknown'
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now - date
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        return `${diffMinutes}m ago`
      } else if (diffHours < 24) {
        return `${diffHours}h ago`
      } else {
        const diffDays = Math.floor(diffHours / 24)
        return `${diffDays}d ago`
      }
    }

    onMounted(() => {
      fetchStatus()
      // Auto-refresh ogni 30 secondi
      refreshInterval = setInterval(fetchStatus, 30000)
    })

    onUnmounted(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    })

    return {
      status,
      loading,
      refreshStatus,
      getStatusClass,
      getBackupStatusClass,
      formatTime,
      formatBackupTime
    }
  }
}
</script>

<style scoped>
.system-status {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  font-family: 'Courier New', monospace;
}

.system-status h3 {
  color: #00ff00;
  margin: 0 0 15px 0;
  font-size: 18px;
  text-shadow: 0 0 10px #00ff00;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.status-item {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 12px;
}

.status-label {
  color: #7c3aed;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.status-value {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-online {
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
}

.status-offline {
  color: #ff4444;
  text-shadow: 0 0 5px #ff4444;
}

.status-degraded {
  color: #ffaa00;
  text-shadow: 0 0 5px #ffaa00;
}

.status-unknown {
  color: #888;
}

.latency {
  font-size: 11px;
  color: #888;
  font-weight: normal;
}

.uptime {
  color: #00aaff;
  text-shadow: 0 0 5px #00aaff;
}

.status-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #333;
  font-size: 12px;
}

.last-update {
  color: #888;
}

.refresh-btn {
  background: #333;
  border: 1px solid #555;
  color: #00ff00;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
}

.refresh-btn:hover {
  background: #444;
  border-color: #777;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .status-grid {
    grid-template-columns: 1fr;
  }
  
  .status-footer {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
