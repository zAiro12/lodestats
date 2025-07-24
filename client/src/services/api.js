import axios from 'axios';

// Configurazione base di axios
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per le richieste
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor per le risposte
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Gestione degli errori comuni
    if (error.response?.status === 401) {
      // Non autorizzato - al momento non abbiamo autenticazione
      console.warn('Richiesta non autorizzata');
    } else if (error.response?.status === 404) {
      console.warn('Risorsa non trovata');
    } else if (error.response?.status >= 500) {
      console.error('Errore del server');
    }
    
    return Promise.reject(error);
  }
);

// API per i giocatori
export const playersAPI = {
  // Ottieni tutti i giocatori
  getAll: async (params = {}) => {
    const response = await api.get('/players', { params });
    return response.data;
  },

  // Crea un nuovo giocatore
  create: async (playerData) => {
    const response = await api.post('/players', playerData);
    return response.data;
  },

  // Ottieni un giocatore specifico
  getById: async (id) => {
    const response = await api.get(`/players/${id}`);
    return response.data;
  },

  // Cerca giocatori (per autocomplete)
  search: async (searchTerm) => {
    const response = await api.get('/players', {
      params: { search: searchTerm, limit: 10 }
    });
    return response.data;
  }
};

// API per le partite
export const matchesAPI = {
  // Ottieni tutte le partite
  getAll: async (params = {}) => {
    const response = await api.get('/matches', { params });
    return response.data;
  },

  // Crea una nuova partita
  create: async (matchData) => {
    const response = await api.post('/matches', matchData);
    return response.data;
  },

  // Ottieni una partita specifica
  getById: async (id) => {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  },

  // Ottieni statistiche generali
  getStats: async () => {
    const response = await api.get('/matches/stats/summary');
    return response.data;
  }
};

// API generale per health check
export const generalAPI = {
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

// Export dell'istanza axios per usi custom
export { api };

// Helper functions
export const handleAPIError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'Errore di connessione al server';
  }
};

export const isAPIError = (error) => {
  return error.response?.data?.success === false;
};
