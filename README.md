# LodeStat ⚽

**LodeStat** è un'applicazione web sviluppata in Vue.js per tenere traccia delle partite di calcetto giocate in azienda presso Lodestar. Il sistema permette di registrare partite, gestire statistiche dei giocatori e mantenere classifiche aggiornate.

## 🏆 Caratteristiche

- 📊 **Gestione Partite**: Registra facilmente le partite giocate con risultati e formazioni
- 👥 **Gestione Giocatori**: Mantieni un database aggiornato di tutti i giocatori
- 📈 **Statistiche**: Visualizza statistiche dettagliate per ogni giocatore (gol, assist, vittorie, etc.)
- 🏅 **Classifiche**: Classifica automatica dei giocatori basata su performance
- 📱 **Responsive Design**: Interfaccia ottimizzata per desktop e mobile
- ⚡ **Real-time Updates**: Aggiornamenti in tempo reale delle statistiche

## 🛠️ Tecnologie Utilizzate

- **Vue.js 3** - Framework JavaScript progressivo
- **Vue Router** - Routing per Single Page Application
- **Pinia** - State management per Vue.js
- **Vite** - Build tool e dev server veloce
- **CSS3/SCSS** - Styling moderno e responsive
- **Chart.js** - Grafici e visualizzazioni dati

## 🚀 Installazione e Setup

### Prerequisiti

- Node.js (versione 16 o superiore)
- npm o yarn

### Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd calcetto
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   # oppure
   yarn install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   # oppure
   yarn dev
   ```

4. **Apri il browser**
   Vai su `http://localhost:5173` per vedere l'applicazione in azione

## 📁 Struttura del Progetto

```
calcetto/
├── public/                 # File statici
├── src/
│   ├── components/         # Componenti Vue riutilizzabili
│   ├── views/             # Pagine/viste principali
│   ├── router/            # Configurazione routing
│   ├── stores/            # Store Pinia per state management
│   ├── assets/            # Risorse (immagini, CSS, etc.)
│   ├── utils/             # Utility e helper functions
│   └── main.js            # Entry point dell'applicazione
├── package.json
└── vite.config.js         # Configurazione Vite
```

## 🎮 Come Utilizzare LodeStat

### Registrare una Nuova Partita

1. Vai alla sezione "Nuova Partita"
2. Seleziona i giocatori per le due squadre
3. Inserisci il risultato finale
4. Aggiungi eventuali dettagli (gol, assist, etc.)
5. Salva la partita

### Visualizzare Statistiche

- **Dashboard**: Panoramica generale con statistiche principali
- **Giocatori**: Lista completa con statistiche individuali
- **Classifiche**: Ranking dei migliori giocatori per varie categorie
- **Storico**: Cronologia di tutte le partite giocate

## 🏗️ Script di Build

```bash
# Sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview

# Linting
npm run lint

# Fix automatico problemi di linting
npm run lint:fix
```

## 🤝 Come Contribuire

1. Forka il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Pusha sul branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Convenzioni di Commit

Utilizziamo le convenzioni di [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nuove funzionalità
- `fix:` - Bug fix
- `docs:` - Modifiche alla documentazione
- `style:` - Modifiche di formattazione
- `refactor:` - Refactoring del codice
- `test:` - Aggiunta o modifica di test
- `chore:` - Modifiche ai file di build, dipendenze, etc.

## 🐛 Segnalazione Bug

Se trovi un bug o hai un suggerimento per migliorare LodeStat:

1. Controlla se il problema è già stato segnalato negli Issues
2. Se non esiste, crea un nuovo Issue con:
   - Descrizione dettagliata del problema
   - Passi per riprodurre il bug
   - Screenshot se necessario
   - Informazioni sul browser/dispositivo utilizzato

## 📊 Roadmap

- [ ] Sistema di notifiche per nuove partite
- [ ] Integrazione con calendario aziendale
- [ ] Export statistiche in PDF/Excel
- [ ] Sistema di tornei e competizioni
- [ ] App mobile nativa
- [ ] Integrazione con social aziendali

## 👨‍💻 Autore

Sviluppato con ❤️ per il team di Lodestar

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

---

**LodeStat** - _Dove ogni gol conta e ogni vittoria è celebrata!_ ⚽🏆
