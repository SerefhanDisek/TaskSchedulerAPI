// src/api/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend API URL'nizi buraya koyun

// Kullan�c� kay�t fonksiyonu
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

// Kullan�c� giri� fonksiyonu
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

// G�rev ekleme fonksiyonu
export const addTask = async (taskData) => {
    return await axios.post(`${API_URL}/tasks`, taskData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // E�er token kullan�yorsan�z
        }
    });
};

// Di�er API fonksiyonlar�n� buraya ekleyin
