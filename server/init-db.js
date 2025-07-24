require('dotenv').config();
const mongoose = require('mongoose');
const Player = require('./models/Player');
const Match = require('./models/Match');

const initializeDatabase = async () => {
  try {
    console.log('🔄 Connessione a MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connesso a MongoDB Atlas!');
    console.log('📍 Database:', mongoose.connection.name);

    // Pulisci il database esistente (solo per inizializzazione)
    console.log('🧹 Pulizia database esistente...');
    await Player.deleteMany({});
    await Match.deleteMany({});

    // Crea giocatori di esempio
    console.log('👥 Creazione giocatori di esempio...');
    const players = await Player.create([
      { nome: 'Marco', cognome: 'Rossi', azienda: 'TechCorp' },
      { nome: 'Luca', cognome: 'Bianchi', azienda: 'TechCorp' },
      { nome: 'Anna', cognome: 'Verde', azienda: 'DesignStudio' },
      { nome: 'Paolo', cognome: 'Neri', azienda: 'DesignStudio' },
      { nome: 'Giulia', cognome: 'Blu', azienda: 'Marketing' },
      { nome: 'Simone', cognome: 'Giallo', azienda: 'Marketing' },
      { nome: 'Francesco', cognome: 'Rosa', azienda: 'Sales' },
      { nome: 'Elena', cognome: 'Viola', azienda: 'Sales' }
    ]);

    console.log(`✅ Creati ${players.length} giocatori`);

    // Crea partite di esempio
    console.log('🏓 Creazione partite di esempio...');
    const matches = await Match.create([
      {
        date: new Date('2025-07-24T15:30:00'),
        teamA: [players[0]._id, players[1]._id], // Marco + Luca
        teamB: [players[2]._id, players[3]._id], // Anna + Paolo
        scoreA: 10,
        scoreB: 8
      },
      {
        date: new Date('2025-07-24T14:15:00'),
        teamA: [players[2]._id], // Anna
        teamB: [players[0]._id], // Marco
        scoreA: 6,
        scoreB: 10
      },
      {
        date: new Date('2025-07-24T16:45:00'),
        teamA: [players[4]._id, players[5]._id], // Giulia + Simone
        teamB: [players[6]._id, players[7]._id], // Francesco + Elena
        scoreA: 12,
        scoreB: 10
      },
      {
        date: new Date('2025-07-23T18:20:00'),
        teamA: [players[1]._id, players[3]._id], // Luca + Paolo
        teamB: [players[4]._id, players[6]._id], // Giulia + Francesco
        scoreA: 8,
        scoreB: 12
      },
      {
        date: new Date('2025-07-23T12:30:00'),
        teamA: [players[0]._id], // Marco
        teamB: [players[5]._id], // Simone
        scoreA: 15,
        scoreB: 13
      }
    ]);

    console.log(`✅ Create ${matches.length} partite`);

    // Statistiche finali
    const totalPlayers = await Player.countDocuments();
    const totalMatches = await Match.countDocuments();

    console.log(`
🎉 Database inizializzato con successo!
👥 Giocatori totali: ${totalPlayers}
🏓 Partite totali: ${totalMatches}

📊 Dati creati:
- TechCorp: Marco Rossi, Luca Bianchi
- DesignStudio: Anna Verde, Paolo Neri  
- Marketing: Giulia Blu, Simone Giallo
- Sales: Francesco Rosa, Elena Viola

🎮 Pronto per iniziare a giocare!
    `);

    await mongoose.connection.close();
    console.log('🔌 Connessione chiusa.');

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione:', error);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log(`
💡 Problemi di connessione a MongoDB Atlas:
1. Verifica la connection string in .env
2. Controlla username e password
3. Assicurati che l'IP sia whitelistato
4. Verifica che il cluster sia attivo
      `);
    }
    
    process.exit(1);
  }
};

// Esegui solo se chiamato direttamente
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
