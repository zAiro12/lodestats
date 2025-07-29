import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv
dotenv.config();

// Import routes
import playersRoutes from './routes/players.js';
import matchesRoutes from './routes/matches.js';
import statusRoutes from './routes/status.js';

const app = express();
const PORT = process.env.PORT || 3000; // Porta corretta per sviluppo

// Trust proxy (per Apache reverse proxy)
app.set('trust proxy', 1);

// Sicurezza - Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // massimo 100 richieste per IP in 15 minuti
  message: {
    success: false,
    message: 'Troppe richieste, riprova più tardi'
  }
});

// Middleware di sicurezza
app.use(helmet({
  contentSecurityPolicy: false, // Disabilitato per lo sviluppo
  crossOriginEmbedderPolicy: false
}));
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://lodestats.lucaairo.it', 'http://lodestats.lucaairo.it'] // In produzione, HTTPS ha priorità
    : ['http://localhost:5173', 'http://localhost:3000'], // In sviluppo, Vite dev server
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

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Opzioni consigliate per la connessione
      maxPoolSize: 10, // Mantiene fino a 10 connessioni socket
      serverSelectionTimeoutMS: 5000, // Timeout dopo 5s invece di 30s di default
      socketTimeoutMS: 45000, // Chiude i socket dopo 45s di inattività
    });

    console.log(`MongoDB connesso: ${conn.connection.host}`);

    // Event listeners per la connessione
    mongoose.connection.on('error', (err) => {
      console.error('Errore connessione MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnesso');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Connessione MongoDB chiusa tramite app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('Errore connessione database:', error);
    process.exit(1);
  }
};

// API Routes
app.use('/api/players', playersRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/status', statusRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server Lodstats attivo',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files (built Vue app)
// In produzione i file sono in ./public, in sviluppo in ../client/dist
const staticPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, 'public')
  : path.join(__dirname, '../client/dist');

app.use(express.static(staticPath));

// Fallback per SPA routing (Vue Router)
app.get('*', (req, res) => {
  // Se è una richiesta API non trovata
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'Endpoint API non trovato'
    });
  }
  
  // Serve l'app Vue per tutte le altre richieste
  const indexPath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'public/index.html')
    : path.join(__dirname, '../client/dist/index.html');
    
  res.sendFile(indexPath);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Errore non gestito:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Errore interno del server',
    error: process.env.NODE_ENV === 'development' ? error.stack : 'Errore generico'
  });
});

// 404 handler per API non trovate
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint API non trovato'
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`
🚀 Server Lodstats avviato!
📱 Porta: ${PORT}
🌍 Ambiente: ${process.env.NODE_ENV || 'development'}
🔗 API: http://localhost:${PORT}/api
📊 Health Check: http://localhost:${PORT}/api/health
      `);
    });
  } catch (error) {
    console.error('Errore avvio server:', error);
    process.exit(1);
  }
};

startServer();
