import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Tasks.css";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("top");
    const [dueDate, setDueDate] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    const API_URL = "https://localhost:7184/api/Tasks";

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskNameChange = (e) => setTaskName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);
    const handleDueDateChange = (e) => setDueDate(e.target.value);

    const addTask = async () => {
        if (taskName.trim() === "" || dueDate === "") {
            alert("L�tfen bir g�rev ad� girin ve ge�erli bir teslim tarihi se�in.");
            return;
        }

        const selectedDate = new Date(dueDate);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("L�tfen gelecekte bir tarih se�in.");
            return;
        }

        const newTask = {
            name: taskName,
            description,
            priority,
            dueDate: selectedDate,
            isCompleted: false,
        };

        try {
            if (editingTaskId) {
                await axios.put(`${API_URL}/${editingTaskId}`, newTask);
                const updatedTasks = tasks.map((t) =>
                    t.id === editingTaskId ? { ...t, ...newTask } : t
                );
                setTasks(updatedTasks);
                setEditingTaskId(null);
            } else {
                const response = await axios.post(API_URL, newTask);
                setTasks([...tasks, response.data]);
            }

            setTaskName("");
            setDescription("");
            setPriority("top");
            setDueDate("");
        } catch (error) {
            console.error("Error adding/updating task:", error);
        }
    };

    const markDone = async (id) => {
        try {
            await axios.patch(`${API_URL}/${id}`, { isCompleted: true });
            const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, isCompleted: true } : t));
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error marking task as done:", error);
        }
    };

    const editTask = (taskToEdit) => {
        setTaskName(taskToEdit.name);
        setDescription(taskToEdit.description);
        setPriority(taskToEdit.priority);
        setDueDate(taskToEdit.dueDate);
        setEditingTaskId(taskToEdit.id);
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            const updatedTasks = tasks.filter((t) => t.id !== id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <main>
            <h2 className="heading">{editingTaskId ? "G�revi G�ncelle" : "G�rev Ekle"}</h2>
            <div className="task-form">
                <input
                    type="text"
                    id="taskName"
                    placeholder="G�rev ad� girin..."
                    value={taskName}
                    onChange={handleTaskNameChange}
                />
                <input
                    type="text"
                    id="description"
                    placeholder="A��klama girin..."
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <select
                    id="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="top">�ncelikli</option>
                    <option value="middle">Orta �ncelik</option>
                    <option value="low">Az �ncelikli</option>
                </select>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={handleDueDateChange}
                />
                <button id="add-task" onClick={addTask}>
                    {editingTaskId ? "G�ncelle" : "Ekle"}
                </button>
            </div>

            <h2 className="heading">Aktif G�revler</h2>
            <div className="task-list">
                <table>
                    <thead>
                        <tr>
                            <th>G�rev Ad�</th>
                            <th>A��klama</th>
                            <th>�ncelik</th>
                            <th>Teslim Tarihi</th>
                            <th>Durum</th>
                            <th>��lemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.filter(t => !t.isCompleted).map((t) => (
                            <tr key={t.id}>
                                <td>{t.name}</td>
                                <td>{t.description}</td>
                                <td>{t.priority}</td>
                                <td>{new Date(t.dueDate).toLocaleDateString()}</td>
                                <td>
                                    {!t.isCompleted && (
                                        <button onClick={() => markDone(t.id)}>
                                            Tamamla
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => editTask(t)}>
                                        D�zenle
                                    </button>
                                    <button onClick={() => deleteTask(t.id)}>
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Tasks;
