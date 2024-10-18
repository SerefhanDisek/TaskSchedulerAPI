import { useState } from "react";
import "../styles/Tasks.css"; // Ýsterseniz stilleri ekleyebilirsiniz

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [deadline, setDeadline] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleTaskChange = (e) => setTask(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);
    const handleDeadlineChange = (e) => setDeadline(e.target.value);

    const addTask = () => {
        if (task.trim() === "" || deadline === "") {
            alert("Lutfen bir gorev girin ve gecerli bir teslim tarihi secin.");
            return;
        }

        const selectedDate = new Date(deadline);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("Lutfen gelecekte bir tarih secin.");
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            task,
            priority,
            deadline,
            done: false,
        };

        if (editingTaskId) {
            // Güncelleme iþlemi
            const updatedTasks = tasks.map((t) =>
                t.id === editingTaskId ? { ...t, task, priority, deadline } : t
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
        } else {
            // Yeni görev ekleme
            setTasks([...tasks, newTask]);
        }

        // Girdi alanlarýný sýfýrlama
        setTask("");
        setPriority("top");
        setDeadline("");
    };

    const markDone = (id) => {
        const updatedTasks = tasks.map((t) => t.id === id ? { ...t, done: true } : t);
        setTasks(updatedTasks);
    };

    const editTask = (taskToEdit) => {
        setTask(taskToEdit.task);
        setPriority(taskToEdit.priority);
        setDeadline(taskToEdit.deadline);
        setEditingTaskId(taskToEdit.id);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <main>
            <h2 className="heading">{editingTaskId ? "Gorevi Guncelle" : "Gorev Ekle"}</h2>
            <div className="task-form">
                <input
                    type="text"
                    id="task"
                    placeholder="Gorev girin..."
                    value={task}
                    onChange={handleTaskChange}
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
                    id="deadline"
                    value={deadline}
                    onChange={handleDeadlineChange}
                />
                <button id="add-task" onClick={addTask}>
                    {editingTaskId ? "Guncelle" : "Ekle"}
                </button>
            </div>

            <h2 className="heading">Aktif Gorevler</h2>
            <div className="task-list">
                <table>
                    <thead>
                        <tr>
                            <th>Gorev Adi</th>
                            <th>Oncelik</th>
                            <th>Teslim Tarihi</th>
                            <th>Durum</th>
                            <th>Islemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.filter(t => !t.done).map((t) => (
                            <tr key={t.id}>
                                <td>{t.task}</td>
                                <td>{t.priority}</td>
                                <td>{t.deadline}</td>
                                <td>
                                    {!t.done && (
                                        <button onClick={() => markDone(t.id)}>
                                            Tamamla
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => editTask(t)}>
                                        Duzenle
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
