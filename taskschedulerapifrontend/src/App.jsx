import axios from 'axios';
import { useState } from 'react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:7184/api/tasks'); // API adresini g�ncelleyin
            setTasks(response.data);
            setError(null); // Ba�ar�l� bir �a�r�dan sonra hatay� s�f�rla
        } catch (error) {
            setError("Veri �ekme hatas�: " + error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={fetchTasks}>G�revleri Getir</button>
            {error && <p>{error}</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
