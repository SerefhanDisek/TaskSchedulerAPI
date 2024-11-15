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
    const [errorMessage, setErrorMessage] = useState("");
    const [taskDetails, setTaskDetails] = useState(null); 

    const API_URL = "https://localhost:7184/api/Tasks";

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setErrorMessage("Gorevler yuklenirken bir hata olustu.");
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
            alert("Lutfen bir gorev adi girin ve gecerli bir teslim tarihi secin.");
            return;
        }

        const selectedDate = new Date(dueDate);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("Lutfen gelecekte bir tarih secin.");
            return;
        }

        const newTask = {
            id: editingTaskId ? editingTaskId : undefined,
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
            setErrorMessage("Gorev eklerken veya guncellerken bir hata olustu.");
        }
    };

    const markDone = async (id) => {
        try {
            await axios.patch(`${API_URL}/mark-done/${id}`, { isCompleted: true });
            const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, isCompleted: true } : t));
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error marking task as done:", error);
            setErrorMessage("Gorev tamamlanirken bir hata olustu.");
        }
    };

    const editTask = (taskToEdit) => {
        setTaskName(taskToEdit.name);
        setDescription(taskToEdit.description);
        setPriority(taskToEdit.priority);
        setDueDate(new Date(taskToEdit.dueDate).toISOString().split('T')[0]);
        setEditingTaskId(taskToEdit.id);
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            const updatedTasks = tasks.filter((t) => t.id !== id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
            setErrorMessage("Gorev silinirken bir hata olustu.");
        }
    };

    const fetchTaskDetails = async (taskId) => {
        try {
            const response = await axios.get(`${API_URL}/${taskId}/details`);
            setTaskDetails(response.data);
        } catch (error) {
            console.error("Error fetching task details:", error);
            setErrorMessage("Gorev detaylari alinirken bir hata olustu.");
        }
    };

    return (
        <main>
            <h2 className="heading">{editingTaskId ? "Gorevi Guncelle" : "Gorev Ekle"}</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="task-form">
                <input
                    type="text"
                    id="taskName"
                    placeholder="Gorev adi girin..."
                    value={taskName}
                    onChange={handleTaskNameChange}
                />
                <input
                    type="text"
                    id="description"
                    placeholder="Aciklama girin..."
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <select
                    id="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="top">Oncelikli</option>
                    <option value="middle">Orta Oncelik</option>
                    <option value="low">Az Oncelikli</option>
                </select>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={handleDueDateChange}
                />
                <button className="button" onClick={addTask}>
                    {editingTaskId ? "Guncelle" : "Ekle"}
                </button>
            </div>

            <h2>Gorevler</h2>
            <div className="tasks-section">
                <div className="task-column">
                    <h3>Aktif Gorevler</h3>
                    <ul className="tasks-list">
                        {tasks.filter((task) => !task.isCompleted).map((task) => (
                            <li key={task.id}>
                                <div>
                                    <strong>{task.name}</strong> <em>({task.priority})</em>
                                    <button onClick={() => fetchTaskDetails(task.id)}>Detaylar</button>
                                    <button onClick={() => markDone(task.id)}>Tamamla</button>
                                    <button onClick={() => editTask(task)}>Düzenle</button>
                                    <button onClick={() => deleteTask(task.id)}>Sil</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="task-column">
                    <h3>Tamamlanmis Gorevler</h3>
                    <ul className="tasks-list">
                        {tasks.filter((task) => task.isCompleted).map((task) => (
                            <li key={task.id}>
                                <div>
                                    <strong>{task.name}</strong> <em>({task.priority})</em>
                                    <button onClick={() => fetchTaskDetails(task.id)}>Detaylar</button>
                                    <span>Tamamlandi</span>
                                    <button onClick={() => deleteTask(task.id)}>Sil</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {taskDetails && (
                <div className="task-details">
                    <h3>Gorev Detaylari</h3>
                    <p><strong>Adi:</strong> {taskDetails.name}</p>
                    <p><strong>Aciklama:</strong> {taskDetails.description}</p>
                    <p><strong>Oncelik:</strong> {taskDetails.priority}</p>
                    <p><strong>Teslim Tarihi:</strong> {new Date(taskDetails.dueDate).toLocaleDateString()}</p>
                </div>
            )}
        </main>
    );
};

export default Tasks;
