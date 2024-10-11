// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';  // API URL'ini içe aktar

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    // Bileþen yüklendiðinde görevleri çek
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tasks`); // API'den görevleri çek
                setTasks(response.data);  // Görev listesini state'e kaydet
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);  // Bu boþ baðýmlýlýk dizisi bileþen yüklendiðinde sadece bir kez çalýþtýrýr

    return (
        <div>
            <h1>Görev Listesi</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>  // Görev baþlýklarýný listede göster
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
