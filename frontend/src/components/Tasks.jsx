import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Tasks.css";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [selectedTask, setSelectedTask] = useState(null); // Güncellenecek görev

    const apiUrl = "https://your-api-url/api/Tasks"; // API URL'nizi buraya ekleyin
    const token = localStorage.getItem("token"); // Auth token

    // Tüm görevleri getirme
    const fetchTasks = async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Gorevler alinamadi:", error);
        }
    };

    // Yeni görev ekleme
    const createTask = async () => {
        try {
            await axios.post(apiUrl, newTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            fetchTasks(); // Yeni görev eklendikten sonra listeyi yenile
        } catch (error) {
            console.error("Gorev eklenemedi:", error);
        }
    };

    // Görev silme
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${apiUrl}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks(); // Silindikten sonra listeyi yenile
        } catch (error) {
            console.error("Gorev silinemedi:", error);
        }
    };

    // Görev güncelleme
    const updateTask = async () => {
        try {
            await axios.put(`${apiUrl}/${selectedTask.id}`, selectedTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            fetchTasks(); // Güncelleme sonrasý listeyi yenile
            setSelectedTask(null); // Güncelleme bittiðinde formu temizle
        } catch (error) {
            console.error("Gorev güncellenemedi:", error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Sayfa yüklendiðinde görevleri çek
    }, []);

    return (
        <div>
            <h2>Gorevler Listesi</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.description}
                        <button onClick={() => deleteTask(task.id)}>Sil</button>
                        <button onClick={() => setSelectedTask(task)}>Guncelle</button>
                    </li>
                ))}
            </ul>

            <h3>Yeni Gorev Ekle</h3>
            <input
                type="text"
                value={newTask.title}
                placeholder="Gorev Basligi"
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
                value={newTask.description}
                placeholder="Gorev Aciklamasi"
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button onClick={createTask}>Ekle</button>

            {selectedTask && (
                <div>
                    <h3>Gorev Guncelle</h3>
                    <input
                        type="text"
                        value={selectedTask.title}
                        onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    />
                    <textarea
                        value={selectedTask.description}
                        onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    />
                    <button onClick={updateTask}>Guncelle</button>
                </div>
            )}
        </div>
    );
};

export default Tasks;
