// src/components/AddTask.js
import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/tasks`, {
                title,
                description
            });
            console.log('Görev eklendi:', response.data);
        } catch (error) {
            console.error('Görev eklenirken hata oluþtu:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Görev Baþlýðý:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Görev Açýklamasý:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Görev Ekle</button>
        </form>
    );
};

export default AddTask;
