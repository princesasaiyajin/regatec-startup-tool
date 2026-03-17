import axios from 'axios';

const api = axios.create({
  baseURL: 'https://regatec.api.etetis.com.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;