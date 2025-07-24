#!/usr/bin/env node

// Test script per dimostrare i campi dinamici del sistema status
const http = require('http');
const { URL } = require('url');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';

async function fetchStatus() {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SERVER_URL}/api/status`);
    
    const req = http.get({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: { 'Accept': 'application/json' }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function displayStatus() {
  console.clear();
  console.log('🏓 Lodstats - System Status Monitor');
  console.log('=====================================\n');

  try {
    const status = await fetchStatus();
    
    // Database Status
    const dbIcon = status.database.status === 'online' ? '🟢' : '🔴';
    console.log(`${dbIcon} Database: ${status.database.status.toUpperCase()}`);
    console.log(`   └─ Host: ${status.database.host}`);
    console.log(`   └─ Latency: ${status.database.latency}ms`);
    console.log('');

    // API Server Status
    const apiIcon = status.apiServer.status === 'online' ? '🟢' : '🔴';
    console.log(`${apiIcon} API Server: ${status.apiServer.status.toUpperCase()}`);
    console.log(`   └─ Uptime: ${status.apiServer.uptime}`);
    console.log(`   └─ Version: ${status.apiServer.version}`);
    console.log('');

    // Backup Status
    const backupIcon = status.backup.status === 'completed' ? '🟢' : 
                       status.backup.status === 'failed' ? '🔴' : '🟡';
    console.log(`${backupIcon} Last Backup: ${status.backup.status.toUpperCase()}`);
    
    const lastBackup = new Date(status.backup.lastBackup);
    const now = new Date();
    const diffHours = Math.floor((now - lastBackup) / (1000 * 60 * 60));
    console.log(`   └─ Time: ${diffHours}h ago (${lastBackup.toLocaleString('it-IT')})`);
    console.log('');

    // System Info
    console.log('💻 System Info:');
    console.log(`   └─ Node.js: ${status.system.nodeVersion}`);
    console.log(`   └─ Platform: ${status.system.platform}`);
    console.log(`   └─ Memory: ${status.system.memory.used}MB / ${status.system.memory.total}MB`);
    console.log(`   └─ PID: ${status.system.pid}`);
    console.log('');

    console.log(`⏰ Last Update: ${new Date(status.timestamp).toLocaleTimeString('it-IT')}`);
    console.log('\n🔄 Auto-refresh ogni 5 secondi... (Ctrl+C per uscire)');
    
  } catch (error) {
    console.log('❌ Sistema non raggiungibile');
    console.log(`   └─ Errore: ${error.message}`);
  }
}

// Avvia il monitor
console.log('🚀 Avvio Status Monitor...\n');

// Prima esecuzione
displayStatus();

// Auto-refresh ogni 5 secondi
const intervalId = setInterval(displayStatus, 5000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Monitor terminato. Arrivederci!');
  clearInterval(intervalId);
  process.exit(0);
});

// Handle errors
process.on('unhandledRejection', (reason) => {
  console.error('❌ Errore non gestito:', reason);
});
