# 🏓 Lodstats - Sistema di Gestione Partite Calcetto-Balilla

Un'applicazione fullstack moderna per registrare e gestire partite di calcetto-balilla aziendali.

## 🌐 **LIVE**

### ➡️ [lodestats.lucaairo.it](https://lodestats.lucaairo.it) ⬅️

## 🚀 Caratteristiche Implementate

- ✅ **Registrazione partite** - 1vs1 o 2vs2 con data e punteggio
- ✅ **Gestione giocatori** - Lista con autocomplete e creazione al volo
- ✅ **Visualizzazione partite** - Cronologia completa delle partite
- ✅ **Dashboard statistiche** - Riepilogo generale e giocatori top
- ✅ **Nessun login richiesto** - Accesso diretto e veloce
- ✅ **Database cloud** - MongoDB Atlas per persistenza dei dati
- ✅ **API REST complete** - Backend robusto con validazione
- ✅ **HTTPS SSL** - Certificato Let's Encrypt con rinnovo automatico
- ✅ **Sistema monitoraggio** - Status real-time database e uptime
- ✅ **Design responsive** - Tema retro-terminal ottimizzato
- ✅ **Deploy produzione** - Apache reverse proxy + PM2

## 🎯 Obiettivi del Progetto

### 🧠 **VIBE CODING - AI-FIRST DEVELOPMENT**

**L'obiettivo principale di Lodestats è dimostrare il potere del "vibe coding":**

- 🤖 **100% AI-Generated** - Intero stack sviluppato tramite conversazioni con AI
- 🚫 **No Traditional Coding** - Zero IDE tradizionali, zero stack overflow
- 💭 **Concept to Production** - Da idea a produzione live solo tramite prompt
- ⚡ **Rapid Prototyping** - Feature complete in ore, non settimane
- 🔄 **Iterative AI Conversations** - Sviluppo attraverso dialogo naturale

### 🎮 **Obiettivi Funzionali**

- **Gamification aziendale** - Rendere divertenti le pause caffè
- **Team Building digitale** - Creare connessioni tra colleghi
- **Statistiche trasparenti** - Tutti possono vedere chi è il campione
- **Semplicità d'uso** - Nessuna curva di apprendimento

### 🌟 **Obiettivi Tecnici**

- **Showcase AI capabilities** - Dimostrare cosa si può fare con AI
- **Modern stack** - Vue 3, Node.js, MongoDB Atlas, HTTPS
- **Production ready** - SSL, monitoring, error handling
- **Scalable architecture** - Pronto per crescere

## 🛠️ Stack Tecnologico

### Backend

- **Node.js** + **Express** - Server API REST
- **MongoDB Atlas** - Database cloud con Mongoose ODM
- **Helmet** + **CORS** - Sicurezza e configurazione
- **Rate Limiting** - Protezione da abusi API

### Frontend

- **Vue 3** + **Composition API** - Framework reattivo moderno
- **Vite** - Build tool veloce e dev server
- **Vue Router** - Routing SPA
- **Axios** - HTTP client per comunicazione API

## 🚀 Installazione e Configurazione

### Prerequisiti

- **Node.js** v18 o superiore
- **npm** o **yarn**
- **Account MongoDB Atlas** (per database cloud)

### 1. Clone del Repository

```bash
git clone https://github.com/zairo12/lodstats.git
cd lodstats
```

### 2. Setup Backend

```bash
cd server
npm install
```

Crea il file `.env` con la configurazione MongoDB:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lodstats?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run build
```

### 4. Inizializzazione Database

```bash
cd server
npm run init-db    # Inizializza database con dati di esempio
npm run test-db    # Testa connessione MongoDB Atlas
```

## 🏃‍♂️ Esecuzione

### Modalità Produzione (consigliata)

```bash
cd server
npm start          # Avvia server con MongoDB Atlas
```

L'app sarà disponibile su: `http://localhost:3000`

### Modalità Demo (senza database)

```bash
cd server
npm run demo       # Avvia server con dati in memoria
```

### Modalità Sviluppo (con hot-reload)

Terminal 1 - Backend:

```bash
cd server
npm run dev        # Server su porta 3001
```

Terminal 2 - Frontend:

```bash
cd client
npm run dev        # Dev server su porta 5173
```

## 📊 API Endpoints

### Giocatori

- `GET /api/players` - Lista tutti i giocatori
- `POST /api/players` - Crea nuovo giocatore
- `GET /api/players/:id` - Dettagli giocatore specifico
- `PUT /api/players/:id` - Aggiorna giocatore
- `DELETE /api/players/:id` - Elimina giocatore

### Partite

- `GET /api/matches` - Lista tutte le partite
- `POST /api/matches` - Registra nuova partita
- `GET /api/matches/:id` - Dettagli partita specifica
- `PUT /api/matches/:id` - Aggiorna partita
- `DELETE /api/matches/:id` - Elimina partita

### Statistiche

- `GET /api/stats` - Statistiche generali
- `GET /api/stats/players` - Classifica giocatori
- `GET /api/stats/players/:id` - Statistiche giocatore specifico

### System Status

- `GET /api/status` - Status completo sistema (database, API, backup, uptime)
- `GET /api/status/health` - Health check veloce per monitoring

## 🎮 Come Usare l'App

1. **Dashboard** - Panoramica generale con statistiche principali
2. **Nuova Partita** - Registra partite 1vs1 o 2vs2 con autocomplete giocatori
3. **Partite** - Visualizza cronologia completa delle partite
4. **Giocatori** - Gestisci lista giocatori con statistiche individuali
5. **Statistiche** - Analisi dettagliate e classifiche

## 🔧 Scripts NPM Disponibili

### Backend (server/)

```bash
npm start          # Avvia server produzione con MongoDB Atlas
npm run demo       # Avvia server demo con dati in memoria
npm run dev        # Avvia server sviluppo con nodemon
npm run init-db    # Inizializza database con dati esempio
npm run test-db    # Testa connessione MongoDB Atlas
npm run monitor    # Monitor live dello status sistema
```

### Frontend (client/)

```bash
npm run dev        # Dev server con hot-reload
npm run build      # Build per produzione
npm run preview    # Preview build locale
```

## 🎨 Caratteristiche Interfaccia

- **Tema Retro Terminal** - Design ispirato ai computer degli anni '80
- **Colori Neon** - Verde fosforescente su sfondo scuro
- **Font Monospace** - Courier New per aspetto da terminale
- **Responsive Design** - Funziona su desktop e mobile
- **Navigazione Veloce** - Router Vue per navigazione istantanea

## 🔒 Sicurezza e Performance

- **Rate Limiting** - Protezione da abusi API
- **Input Validation** - Validazione dati sia client che server
- **Error Handling** - Gestione errori robusta e user-friendly
- **Database Indexes** - Query ottimizzate su MongoDB
- **CORS Configuration** - Configurazione sicura per richieste cross-origin

## 🌟 Roadmap e Feature Future

- [ ] **Tornei** - Sistema gestione tornei e playoff

## 👥 Contribuire

1. Fork del repository
2. Crea branch feature (`git checkout -b feature/nuova-feature`)
3. Commit delle modifiche (`git commit -m 'Aggiungi nuova feature'`)
4. Push al branch (`git push origin feature/nuova-feature`)
5. Apri Pull Request

### 📝 Convenzioni di Commit

Utilizziamo le convenzioni di [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nuove funzionalità
- `fix:` - Bug fix
- `docs:` - Modifiche alla documentazione
- `style:` - Modifiche di formattazione
- `refactor:` - Refactoring del codice
- `test:` - Aggiunta o modifica di test
- `chore:` - Modifiche ai file di build, dipendenze, etc.

## 🐛 Segnalazione Bug

Se trovi un bug o hai un suggerimento:

1. Controlla se il problema è già stato segnalato negli Issues
2. Se non esiste, crea un nuovo Issue con:
   - Descrizione dettagliata del problema
   - Passi per riprodurre il bug
   - Screenshot se necessario
   - Informazioni sul browser/dispositivo utilizzato

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi file `LICENSE` per dettagli.

## 🚨 Troubleshooting

### Problemi Comuni

#### Database Connection Failed

- Verifica che la stringa MongoDB URI sia corretta in `.env`
- Controlla che l'IP sia whitelistato su MongoDB Atlas
- Testa la connessione con `npm run test-db`

#### Build Frontend Fallisce

- Verifica che Node.js sia v18 o superiore
- Cancella `node_modules` e reinstalla: `rm -rf node_modules && npm install`

#### Porta 3000 già in uso

- Cambia porta in `.env`: `PORT=3001`
- O termina il processo: `lsof -ti:3000 | xargs kill -9`

---

**Made with ❤️ for calcetto-balilla enthusiasts!** �

### 📊 Current Status

- **🟢 Database**: MongoDB Atlas Connected
- **🟢 API Server**: Running (Express.js)
- **🟢 Last Backup**: Auto-scheduled
- **🟢 Uptime**: Real-time monitoring
