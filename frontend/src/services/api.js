import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const generate = (data) => API.post('/generate', data);
export const deploy = (data) => API.post('/deploy', data);
export const diagram = (data) => API.post('/diagram', data);
