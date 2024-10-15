// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7184/swagger/index.html',
});

export const getUsers = () => api.get('/users');
export const getTasks = () => api.get('/tasks');
// Diðer API çaðrýlarýný ekleyin
