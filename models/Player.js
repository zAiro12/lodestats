import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio'],
    trim: true,
    maxlength: [50, 'Il nome non può superare i 50 caratteri']
  },
  cognome: {
    type: String,
    required: [true, 'Il cognome è obbligatorio'],
    trim: true,
    maxlength: [50, 'Il cognome non può superare i 50 caratteri']
  },
  azienda: {
    type: String,
    required: [true, 'L\'azienda è obbligatoria'],
    trim: true,
    maxlength: [100, 'L\'azienda non può superare i 100 caratteri']
  }
}, {
  timestamps: true, // Aggiunge automaticamente createdAt e updatedAt
  toJSON: { virtuals: true }, // Include i virtual fields nel JSON
  toObject: { virtuals: true }
});

// Virtual per il nome completo
playerSchema.virtual('nomeCompleto').get(function() {
  return `${this.nome} ${this.cognome}`;
});

// Indice composto per evitare duplicati
playerSchema.index({ nome: 1, cognome: 1, azienda: 1 }, { unique: true });

// Middleware per validazione pre-save
playerSchema.pre('save', function(next) {
  // Capitalizza nome e cognome
  this.nome = this.nome.charAt(0).toUpperCase() + this.nome.slice(1).toLowerCase();
  this.cognome = this.cognome.charAt(0).toUpperCase() + this.cognome.slice(1).toLowerCase();
  next();
});

export default mongoose.model('Player', playerSchema);
