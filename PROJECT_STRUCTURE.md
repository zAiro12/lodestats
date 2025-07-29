# 📁 Struttura Progetto LodeStat

## Struttura Unificata - Frontend + Backend
```
lodestats/                      # 🏠 ROOT UNIFICATO
│
├── 📱 FRONTEND (Vue 3)
│   ├── src/                    # Codice sorgente Vue
│   │   ├── components/         # Componenti riutilizzabili
│   │   │   ├── layout/
│   │   │   │   └── TheHeader.vue     # Header navigazione
│   │   │   └── SystemStatus.vue      # Componente status
│   │   │
│   │   ├── views/              # Pagine principali
│   │   │   ├── Dashboard.vue          # 🏠 Homepage con statistiche
│   │   │   ├── NewMatch.vue           # ⚽ Creazione nuove partite
│   │   │   ├── Matches.vue            # 📋 Lista partite
│   │   │   ├── Players.vue            # 👥 Gestione giocatori
│   │   │   └── Stats.vue              # 📊 Statistiche avanzate
│   │   │
│   │   ├── router/             # Routing Vue Router
│   │   │   └── index.js               # Configurazione routes
│   │   │
│   │   ├── services/           # API client
│   │   │   └── api.js                 # Client HTTP per backend
│   │   │
│   │   ├── styles/             # Stili CSS
│   │   │   └── main.css               # CSS tema retro-gaming
│   │   │
│   │   ├── App.vue             # Root component
│   │   └── main.js             # Entry point + Axios config
│   │
│   ├── public/                 # Asset statici
│   │   └── football-icon.svg          # Icona applicazione
│   │
│   ├── index.html              # HTML template
│   └── vite.config.js          # Config Vite + proxy
│
├── 🖥️ BACKEND (Express + MongoDB)
│   ├── server.js               # 🚀 Server principale Express
│   │
│   ├── models/                 # Modelli database MongoDB
│   │   ├── Player.js                  # Schema giocatori
│   │   └── Match.js                   # Schema partite
│   │
│   ├── routes/                 # API endpoints
│   │   ├── players.js                 # CRUD giocatori
│   │   ├── matches.js                 # CRUD partite + stats
│   │   └── status.js                  # Health check + system info
│   │
│   ├── .env                    # Variabili ambiente (MongoDB URI)
│   └── init-db.js              # Script inizializzazione DB
│
├── ⚙️ CONFIGURAZIONE
│   ├── package.json            # 📦 Dipendenze unificate
│   ├── package-lock.json       # Lock versioni
│   └── .gitignore              # File da ignorare Git
│
└── 📚 DOCUMENTAZIONE
    ├── README.md               # Documentazione completa
    ├── QUICK_START.md          # Guida rapida
    ├── LICENSE                 # Licenza MIT
    └── PROJECT_STRUCTURE.md   # Questo file
```

## 🎯 Architettura Tecnica

### Frontend (Vue 3)
- **Framework**: Vue 3 Composition API
- **Routing**: Vue Router 4 SPA
- **Build Tool**: Vite 5.x (ultra-veloce)
- **HTTP Client**: Axios con interceptors
- **Styling**: CSS moderno con variabili custom

### Backend (Express)
- **Runtime**: Node.js con ES Modules
- **Framework**: Express.js REST API
- **Database**: MongoDB Atlas + Mongoose ODM
- **Sicurezza**: CORS, Helmet, Rate Limiting
- **Validazione**: Schema validation integrata

### Database (MongoDB)
```javascript
// Player Schema
{
  nome: String,           // Required
  cognome: String,        // Required
  azienda: String,        // Optional
  createdAt: Date,        // Auto
  updatedAt: Date         // Auto
}

// Match Schema  
{
  date: Date,             // Auto now()
  teamA: [ObjectId],      // 1-2 players
  teamB: [ObjectId],      // 1-2 players  
  scoreA: Number,         // Required
  scoreB: Number,         // Required
  createdAt: Date,        // Auto
  updatedAt: Date         // Auto
}
```

## 🔧 Scripts NPM

### Sviluppo
```bash
npm run dev     # Avvia backend + frontend insieme
npm run client  # Solo frontend (porta 5173)
npm run server  # Solo backend (porta 3000)
```

### Produzione
```bash
npm run build   # Build frontend per produzione
npm start       # Avvia solo server produzione
npm run preview # Preview build produzione
```

### Database
```bash
node init-db.js # Inizializza database MongoDB
```

## 🌐 Porte e URL

### Sviluppo
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000  
- **API Base**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

### Proxy Automatico
Vite configura automaticamente il proxy:
- `localhost:5173/api/*` → `localhost:3000/api/*`

## 🔑 Variabili Ambiente

### File .env richiesto
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lodestats
PORT=3000
NODE_ENV=development
```

### Configurazione MongoDB Atlas
1. Crea account su MongoDB Atlas
2. Crea cluster gratuito
3. Configura database user
4. Whitelist IP address
5. Ottieni connection string
6. Inserisci in .env

## 📡 API Endpoints

### Players
- `GET /api/players` - Lista giocatori (con search)
- `POST /api/players` - Crea nuovo giocatore
- `GET /api/players/:id` - Dettagli giocatore

### Matches
- `GET /api/matches` - Lista partite (con filtri)
- `POST /api/matches` - Crea nuova partita
- `GET /api/matches/stats/summary` - Statistiche generali

### System
- `GET /api/status` - Status sistema completo
- `GET /api/health` - Health check semplice

## 🎨 Tema e Styling

### Colori Principali
```css
--primary-green: #00ff41    /* Verde Matrix */
--neon-blue: #00d4ff        /* Blu Neon */
--warning-orange: #ff6600   /* Arancione */
--bg-dark: #0a0a0a         /* Sfondo scuro */
```

### Font Stack
- **Pixel**: Font retro per titoli
- **Mono**: Font monospace per codice
- **Sans**: Font moderno per testo

## 🧪 Testing

### Test Funzionalità
1. Avvia: `npm run dev`
2. Apri: http://localhost:5173
3. Testa autocompletamento in "Nuova Partita"
4. Crea partita e verifica dashboard
5. Controlla status sistema nel terminal

### Debugging
- **Backend logs**: Visibili nel terminal
- **Frontend logs**: Browser DevTools
- **Database**: MongoDB Atlas dashboard
- **API**: Usa Postman o browser per endpoints

## 🚀 Deployment

### Build Produzione
```bash
npm run build   # Genera dist/ folder
```

### Variabili Produzione
```env
NODE_ENV=production
PORT=80
MONGODB_URI=<production-uri>
```

---

## 💡 Note Tecniche

- **ES Modules**: Tutto il progetto usa import/export
- **Concurrently**: Avvia frontend e backend insieme
- **Proxy Dev**: Vite gestisce le API calls
- **Hot Reload**: Modifiche instant reload
- **MongoDB Atlas**: Database cloud gratuito

## 🎮 Funzionalità Chiave

- ✅ **Autocompletamento giocatori** in tempo reale
- ✅ **Dashboard interattiva** con statistiche live
- ✅ **Sistema unificato** - un comando per tutto
- ✅ **Tema retro-gaming** stile terminal
- ✅ **API REST complete** con validazione
- ✅ **Database cloud** MongoDB Atlas
- ✅ **Responsive design** mobile-friendly

---

🎉 **Tutto in un unico posto, un unico comando!** 🎉
