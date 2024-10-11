// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';  // API URL'ini i�e aktar

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    // Bile�en y�klendi�inde g�revleri �ek
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tasks`); // API'den g�revleri �ek
                setTasks(response.data);  // G�rev listesini state'e kaydet
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);  // Bu bo� ba��ml�l�k dizisi bile�en y�klendi�inde sadece bir kez �al��t�r�r

    return (
        <div>
            <h1>G�rev Listesi</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>  // G�rev ba�l�klar�n� listede g�ster
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
