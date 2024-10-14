import axios from 'axios';
import { useState } from 'react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:7184/api/tasks'); // API adresini güncelleyin
            setTasks(response.data);
            setError(null); // Baþarýlý bir çaðrýdan sonra hatayý sýfýrla
        } catch (error) {
            setError("Veri çekme hatasý: " + error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={fetchTasks}>Görevleri Getir</button>
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
