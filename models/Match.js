import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'La data è obbligatoria'],
    default: Date.now
  },
  teamA: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: [true, 'Il team A deve avere almeno un giocatore']
  }],
  teamB: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: [true, 'Il team B deve avere almeno un giocatore']
  }],
  scoreA: {
    type: Number,
    required: [true, 'Il punteggio del team A è obbligatorio'],
    min: [0, 'Il punteggio non può essere negativo'],
    max: [50, 'Il punteggio massimo è 50']
  },
  scoreB: {
    type: Number,
    required: [true, 'Il punteggio del team B è obbligatorio'],
    min: [0, 'Il punteggio non può essere negativo'],
    max: [50, 'Il punteggio massimo è 50']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual per il vincitore
matchSchema.virtual('vincitore').get(function() {
  if (this.scoreA > this.scoreB) return 'Team A';
  if (this.scoreB > this.scoreA) return 'Team B';
  return 'Pareggio';
});

// Virtual per la durata della partita (se necessario)
matchSchema.virtual('durataPartita').get(function() {
  return `${this.scoreA}-${this.scoreB}`;
});

// Validazione personalizzata per i team
matchSchema.pre('save', function(next) {
  // Controlla che i team abbiano massimo 2 giocatori
  if (this.teamA.length > 2) {
    return next(new Error('Il team A può avere massimo 2 giocatori'));
  }
  if (this.teamB.length > 2) {
    return next(new Error('Il team B può avere massimo 2 giocatori'));
  }
  
  // Controlla che i team abbiano almeno 1 giocatore
  if (this.teamA.length === 0) {
    return next(new Error('Il team A deve avere almeno un giocatore'));
  }
  if (this.teamB.length === 0) {
    return next(new Error('Il team B deve avere almeno un giocatore'));
  }
  
  // Controlla che non ci siano giocatori duplicati nella stessa partita
  const allPlayers = [...this.teamA, ...this.teamB];
  const uniquePlayers = [...new Set(allPlayers.map(id => id.toString()))];
  if (allPlayers.length !== uniquePlayers.length) {
    return next(new Error('Un giocatore non può essere in entrambi i team'));
  }
  
  next();
});

// Indice per ordinare per data (più recenti prima)
matchSchema.index({ date: -1 });

export default mongoose.model('Match', matchSchema);
