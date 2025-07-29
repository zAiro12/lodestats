import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Tempo di avvio del server
const serverStartTime = new Date();

// GET /api/status - Informazioni stato sistema
router.get('/', async (req, res) => {
  try {
    // Database status
    const dbStatus = mongoose.connection.readyState === 1 ? 'online' : 'offline';
    const dbLatency = await measureDatabaseLatency();
    
    // API Server status
    const apiStatus = 'online'; // Se arriviamo qui, l'API è online
    
    // Uptime calculation
    const uptimeMs = Date.now() - serverStartTime.getTime();
    const uptimeFormatted = formatUptime(uptimeMs);
    
    // Last backup (simulato - in futuro potrebbe essere un vero controllo)
    const lastBackup = await getLastBackupInfo();
    
    // System info
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      pid: process.pid
    };

    res.json({
      timestamp: new Date().toISOString(),
      status: 'healthy',
      database: {
        status: dbStatus,
        latency: dbLatency,
        connected: mongoose.connection.readyState === 1,
        host: mongoose.connection.host || 'MongoDB Atlas'
      },
      apiServer: {
        status: apiStatus,
        uptime: uptimeFormatted,
        startTime: serverStartTime.toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      },
      backup: {
        lastBackup: lastBackup.date,
        status: lastBackup.status,
        nextScheduled: lastBackup.nextScheduled
      },
      system: systemInfo
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      timestamp: new Date().toISOString(),
      status: 'error',
      error: 'Failed to get system status',
      database: { status: 'unknown' },
      apiServer: { status: 'degraded' }
    });
  }
});

// Misura latenza database con ping semplice
async function measureDatabaseLatency() {
  try {
    const start = Date.now();
    await mongoose.connection.db.admin().ping();
    return Date.now() - start;
  } catch (error) {
    return -1;
  }
}

// Formatta uptime in formato leggibile
function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

// Simula informazioni backup (in futuro sarà collegato a sistema backup reale)
async function getLastBackupInfo() {
  // TODO: Implementare sistema backup reale
  const now = new Date();
  const lastBackup = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // 24 ore fa
  const nextBackup = new Date(now.getTime() + (24 * 60 * 60 * 1000)); // 24 ore da ora
  
  return {
    date: lastBackup.toISOString(),
    status: 'completed',
    nextScheduled: nextBackup.toISOString()
  };
}

// GET /api/status/health - Health check semplificato
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Date.now() - serverStartTime.getTime()
  });
});

export default router;
