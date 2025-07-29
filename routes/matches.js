import express from 'express';
import Match from '../models/Match.js';
import Player from '../models/Player.js';

const router = express.Router();

// GET /api/matches - Ottieni tutte le partite
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, player } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    // Filtro per giocatore specifico
    if (player) {
      query.$or = [
        { teamA: player },
        { teamB: player }
      ];
    }
    
    const matches = await Match.find(query)
      .populate('teamA', 'nome cognome azienda')
      .populate('teamB', 'nome cognome azienda')
      .sort({ date: -1 }) // Più recenti prima
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Match.countDocuments(query);
    
    res.json({
      success: true,
      data: matches,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: matches.length,
        totalMatches: total
      }
    });
  } catch (error) {
    console.error('Errore nel recupero delle partite:', error);
    res.status(500).json({
      success: false,
      message: 'Errore interno del server',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Errore generico'
    });
  }
});

// POST /api/matches - Crea una nuova partita
router.post('/', async (req, res) => {
  try {
    const { date, teamA, teamB, scoreA, scoreB } = req.body;
    
    // Validazione input base
    if (!teamA || !teamB || scoreA === undefined || scoreB === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Team A, Team B e punteggi sono obbligatori'
      });
    }
    
    // Validazione array teams
    if (!Array.isArray(teamA) || !Array.isArray(teamB)) {
      return res.status(400).json({
        success: false,
        message: 'I team devono essere array di giocatori'
      });
    }
    
    // Validazione lunghezza teams
    if (teamA.length === 0 || teamA.length > 2 || teamB.length === 0 || teamB.length > 2) {
      return res.status(400).json({
        success: false,
        message: 'Ogni team deve avere 1 o 2 giocatori'
      });
    }
    
    // Validazione punteggi
    if (scoreA < 0 || scoreB < 0) {
      return res.status(400).json({
        success: false,
        message: 'I punteggi non possono essere negativi'
      });
    }
    
    // Verifica che tutti i giocatori esistano
    const allPlayerIds = [...teamA, ...teamB];
    const existingPlayers = await Player.find({ _id: { $in: allPlayerIds } });
    
    if (existingPlayers.length !== allPlayerIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Uno o più giocatori non esistono'
      });
    }
    
    // Verifica che non ci siano duplicati
    const uniquePlayerIds = [...new Set(allPlayerIds.map(id => id.toString()))];
    if (allPlayerIds.length !== uniquePlayerIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Un giocatore non può essere in entrambi i team'
      });
    }
    
    // Crea la nuova partita
    const newMatch = new Match({
      date: date ? new Date(date) : new Date(),
      teamA,
      teamB,
      scoreA: parseInt(scoreA),
      scoreB: parseInt(scoreB)
    });
    
    const savedMatch = await newMatch.save();
    
    // Popola i dati dei giocatori per la risposta
    const populatedMatch = await Match.findById(savedMatch._id)
      .populate('teamA', 'nome cognome azienda')
      .populate('teamB', 'nome cognome azienda');
    
    res.status(201).json({
      success: true,
      message: 'Partita creata con successo',
      data: populatedMatch
    });
  } catch (error) {
    console.error('Errore nella creazione della partita:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Dati non validi',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID giocatore non valido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Errore interno del server',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Errore generico'
    });
  }
});

// GET /api/matches/:id - Ottieni una partita specifica
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('teamA', 'nome cognome azienda')
      .populate('teamB', 'nome cognome azienda');
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Partita non trovata'
      });
    }
    
    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error('Errore nel recupero della partita:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID partita non valido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

// GET /api/matches/stats/summary - Statistiche generali
router.get('/stats/summary', async (req, res) => {
  try {
    const totalMatches = await Match.countDocuments();
    const totalPlayers = await Player.countDocuments();
    
    // Trova il giocatore con più partite giocate
    const playerStats = await Match.aggregate([
      {
        $project: {
          players: { $concatArrays: ['$teamA', '$teamB'] }
        }
      },
      { $unwind: '$players' },
      {
        $group: {
          _id: '$players',
          matchesPlayed: { $sum: 1 }
        }
      },
      { $sort: { matchesPlayed: -1 } },
      { $limit: 1 }
    ]);
    
    let topPlayer = null;
    if (playerStats.length > 0) {
      const player = await Player.findById(playerStats[0]._id);
      topPlayer = {
        player,
        matchesPlayed: playerStats[0].matchesPlayed
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
    console.error('Errore nel recupero delle statistiche:', error);
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

export default router;
