const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /api/players - Ottieni tutti i giocatori
router.get('/', async (req, res) => {
  try {
    const { search, azienda } = req.query;
    let query = {};
    
    // Filtro per ricerca (nome o cognome)
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { nome: searchRegex },
        { cognome: searchRegex }
      ];
    }
    
    // Filtro per azienda
    if (azienda) {
      query.azienda = new RegExp(azienda, 'i');
    }
    
    const players = await Player.find(query)
      .sort({ cognome: 1, nome: 1 }) // Ordina per cognome, poi nome
      .limit(100); // Limita i risultati per performance
    
    res.json({
      success: true,
      data: players,
      count: players.length
    });
  } catch (error) {
    console.error('Errore nel recupero dei giocatori:', error);
    res.status(500).json({
      success: false,
      message: 'Errore interno del server',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Errore generico'
    });
  }
});

// POST /api/players - Crea un nuovo giocatore
router.post('/', async (req, res) => {
  try {
    const { nome, cognome, azienda } = req.body;
    
    // Validazione input
    if (!nome || !cognome || !azienda) {
      return res.status(400).json({
        success: false,
        message: 'Nome, cognome e azienda sono obbligatori'
      });
    }
    
    // Verifica se il giocatore esiste già
    const existingPlayer = await Player.findOne({
      nome: new RegExp(`^${nome}$`, 'i'),
      cognome: new RegExp(`^${cognome}$`, 'i'),
      azienda: new RegExp(`^${azienda}$`, 'i')
    });
    
    if (existingPlayer) {
      return res.status(409).json({
        success: false,
        message: 'Giocatore già esistente',
        data: existingPlayer
      });
    }
    
    // Crea il nuovo giocatore
    const newPlayer = new Player({
      nome: nome.trim(),
      cognome: cognome.trim(),
      azienda: azienda.trim()
    });
    
    const savedPlayer = await newPlayer.save();
    
    res.status(201).json({
      success: true,
      message: 'Giocatore creato con successo',
      data: savedPlayer
    });
  } catch (error) {
    console.error('Errore nella creazione del giocatore:', error);
    
    // Gestione errori specifici
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Giocatore già esistente'
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Dati non validi',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Errore interno del server',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Errore generico'
    });
  }
});

// GET /api/players/:id - Ottieni un giocatore specifico
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    
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
    console.error('Errore nel recupero del giocatore:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID giocatore non valido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Errore interno del server'
    });
  }
});

module.exports = router;
