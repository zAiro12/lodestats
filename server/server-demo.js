require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data store (sostituisce MongoDB per la demo)
let players = [
  {
    _id: '1',
    nome: 'Marco',
    cognome: 'Rossi',
    azienda: 'TechCorp',
    nomeCompleto: 'Marco Rossi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    nome: 'Luca',
    cognome: 'Bianchi',
    azienda: 'TechCorp',
    nomeCompleto: 'Luca Bianchi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    nome: 'Anna',
    cognome: 'Verde',
    azienda: 'DesignStudio',
    nomeCompleto: 'Anna Verde',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    nome: 'Paolo',
    cognome: 'Neri',
    azienda: 'DesignStudio',
    nomeCompleto: 'Paolo Neri',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let matches = [
  {
    _id: '1',
    date: new Date('2025-07-24T15:30:00'),
    teamA: [
      { _id: '1', nome: 'Marco', cognome: 'Rossi', azienda: 'TechCorp' },
      { _id: '2', nome: 'Luca', cognome: 'Bianchi', azienda: 'TechCorp' }
    ],
    teamB: [
      { _id: '3', nome: 'Anna', cognome: 'Verde', azienda: 'DesignStudio' },
      { _id: '4', nome: 'Paolo', cognome: 'Neri', azienda: 'DesignStudio' }
    ],
    scoreA: 10,
    scoreB: 8,
    vincitore: 'Team A',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    date: new Date('2025-07-24T14:15:00'),
    teamA: [
      { _id: '3', nome: 'Anna', cognome: 'Verde', azienda: 'DesignStudio' }
    ],
    teamB: [
      { _id: '1', nome: 'Marco', cognome: 'Rossi', azienda: 'TechCorp' }
    ],
    scoreA: 6,
    scoreB: 10,
    vincitore: 'Team B',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let nextPlayerId = 5;
let nextMatchId = 3;

// Sicurezza - Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Troppe richieste, riprova più tardi'
  }
});

// Middleware di sicurezza
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:3000']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Tempo di avvio del server per uptime
const serverStartTime = new Date();

// API Routes - Status
app.get('/api/status', (req, res) => {
  const uptimeMs = Date.now() - serverStartTime.getTime();
  const formatUptime = (ms) => {
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
  };

  // Simula backup info
  const now = new Date();
  const lastBackup = new Date(now.getTime() - (2 * 60 * 60 * 1000)); // 2 ore fa

  res.json({
    timestamp: new Date().toISOString(),
    status: 'healthy',
    database: {
      status: 'online',
      latency: 5, // Demo mode - no real database
      connected: true,
      host: 'Demo Mode (In-Memory)'
    },
    apiServer: {
      status: 'online',
      uptime: formatUptime(uptimeMs),
      startTime: serverStartTime.toISOString(),
      version: '1.0.0-demo'
    },
    backup: {
      lastBackup: lastBackup.toISOString(),
      status: 'completed',
      nextScheduled: new Date(now.getTime() + (22 * 60 * 60 * 1000)).toISOString()
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      pid: process.pid
    }
  });
});

app.get('/api/status/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Date.now() - serverStartTime.getTime()
  });
});

// API Routes - Players
app.get('/api/players', (req, res) => {
  try {
    const { search, azienda } = req.query;
    let filteredPlayers = players;
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filteredPlayers = players.filter(p => 
        searchRegex.test(p.nome) || searchRegex.test(p.cognome)
      );
    }
    
    if (azienda) {
      const aziendaRegex = new RegExp(azienda, 'i');
      filteredPlayers = filteredPlayers.filter(p => aziendaRegex.test(p.azienda));
    }
    
    res.json({
      success: true,
      data: filteredPlayers,
      count: filteredPlayers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

app.post('/api/players', (req, res) => {
  try {
    const { nome, cognome, azienda } = req.body;
    
    if (!nome || !cognome || !azienda) {
      return res.status(400).json({
        success: false,
        message: 'Nome, cognome e azienda sono obbligatori'
      });
    }
    
    // Verifica se il giocatore esiste già
    const existing = players.find(p => 
      p.nome.toLowerCase() === nome.toLowerCase() &&
      p.cognome.toLowerCase() === cognome.toLowerCase() &&
      p.azienda.toLowerCase() === azienda.toLowerCase()
    );
    
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Giocatore già esistente',
        data: existing
      });
    }
    
    const newPlayer = {
      _id: nextPlayerId.toString(),
      nome: nome.trim(),
      cognome: cognome.trim(),
      azienda: azienda.trim(),
      nomeCompleto: `${nome.trim()} ${cognome.trim()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    players.push(newPlayer);
    nextPlayerId++;
    
    res.status(201).json({
      success: true,
      message: 'Giocatore creato con successo',
      data: newPlayer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

app.get('/api/players/:id', (req, res) => {
  try {
    const player = players.find(p => p._id === req.params.id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Giocatore non trovato'
      });
    }
    
    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

// API Routes - Matches
app.get('/api/matches', (req, res) => {
  try {
    const { page = 1, limit = 20, player } = req.query;
    let filteredMatches = matches;
    
    if (player) {
      filteredMatches = matches.filter(m => 
        m.teamA.some(p => p._id === player) || m.teamB.some(p => p._id === player)
      );
    }
    
    // Ordinamento per data (più recenti prima)
    filteredMatches.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const skip = (page - 1) * limit;
    const paginatedMatches = filteredMatches.slice(skip, skip + parseInt(limit));
    
    res.json({
      success: true,
      data: paginatedMatches,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(filteredMatches.length / limit),
        count: paginatedMatches.length,
        totalMatches: filteredMatches.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

app.post('/api/matches', (req, res) => {
  try {
    const { date, teamA, teamB, scoreA, scoreB } = req.body;
    
    if (!teamA || !teamB || scoreA === undefined || scoreB === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Team A, Team B e punteggi sono obbligatori'
      });
    }
    
    // Trova i giocatori
    const teamAPlayers = teamA.map(id => players.find(p => p._id === id)).filter(Boolean);
    const teamBPlayers = teamB.map(id => players.find(p => p._id === id)).filter(Boolean);
    
    if (teamAPlayers.length !== teamA.length || teamBPlayers.length !== teamB.length) {
      return res.status(400).json({
        success: false,
        message: 'Uno o più giocatori non esistono'
      });
    }
    
    const newMatch = {
      _id: nextMatchId.toString(),
      date: date ? new Date(date) : new Date(),
      teamA: teamAPlayers,
      teamB: teamBPlayers,
      scoreA: parseInt(scoreA),
      scoreB: parseInt(scoreB),
      vincitore: scoreA > scoreB ? 'Team A' : scoreB > scoreA ? 'Team B' : 'Pareggio',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    matches.push(newMatch);
    nextMatchId++;
    
    res.status(201).json({
      success: true,
      message: 'Partita creata con successo',
      data: newMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

app.get('/api/matches/stats/summary', (req, res) => {
  try {
    const totalMatches = matches.length;
    const totalPlayers = players.length;
    
    // Trova il giocatore con più partite
    const playerMatchCount = {};
    matches.forEach(match => {
      [...match.teamA, ...match.teamB].forEach(player => {
        playerMatchCount[player._id] = (playerMatchCount[player._id] || 0) + 1;
      });
    });
    
    let topPlayer = null;
    if (Object.keys(playerMatchCount).length > 0) {
      const topPlayerId = Object.keys(playerMatchCount).reduce((a, b) => 
        playerMatchCount[a] > playerMatchCount[b] ? a : b
      );
      
      topPlayer = {
        player: players.find(p => p._id === topPlayerId),
        matchesPlayed: playerMatchCount[topPlayerId]
      };
    }
    
    res.json({
      success: true,
      data: {
        totalMatches,
        totalPlayers,
        topPlayer
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server Lodstats attivo (modalità demo)',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files (built Vue app)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback per SPA routing (Vue Router)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'Endpoint API non trovato'
    });
  }
  
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Errore non gestito:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Errore interno del server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Server Lodstats Demo avviato!
📱 Porta: ${PORT}
🌍 Ambiente: ${process.env.NODE_ENV || 'development'}
🔗 API: http://localhost:${PORT}/api
📊 Health Check: http://localhost:${PORT}/api/health
🎮 App: http://localhost:${PORT}

⚠️  MODALITÀ DEMO: Usando dati in memoria invece di MongoDB
💡 Per usare MongoDB: installa e avvia MongoDB, poi usa server.js
  `);
});
