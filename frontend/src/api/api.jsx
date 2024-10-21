// src/api/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend API URL'nizi buraya koyun

// Kullanýcý kayýt fonksiyonu
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

// Kullanýcý giriþ fonksiyonu
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

// Görev ekleme fonksiyonu
export const addTask = async (taskData) => {
    return await axios.post(`${API_URL}/tasks`, taskData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Eðer token kullanýyorsanýz
        }
    });
};

// Diðer API fonksiyonlarýný buraya ekleyin
