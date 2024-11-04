import { useState, useEffect } from "react";
import "../styles/TaskScheduler.css";

function TaskScheduler() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        fetchTasks();
        fetchCompletedTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("https://localhost:7184/api/TaskScheduler/active-tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching active tasks:", error);
        }
    };

    const fetchCompletedTasks = async () => {
        try {
            const response = await fetch("https://localhost:7184/api/TaskScheduler/completed-tasks");
            const data = await response.json();
            setCompletedTasks(data);
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

    const handleTaskChange = (e) => setTask(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);
    const handleDueDateChange = (e) => setDueDate(e.target.value);

    const addTask = async () => {
        if (task.trim() === "" || dueDate === "") {
            alert("Lütfen bir görev ve geçerli bir teslim tarihi girin.");
            return;
        }

        const selectedDate = new Date(dueDate);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            alert("Lütfen ileri bir tarih seçin.");
            return;
        }

        const newTask = {
            taskName: task,
            priority,
            deadline: dueDate,
        };

        try {
            const response = await fetch("https://localhost:7184/api/TaskScheduler/add-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
            if (response.ok) {
                fetchTasks();
                setTask("");
                setPriority("top");
                setDueDate("");
            } else {
                alert("Görev eklenemedi.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const markDone = async (id) => {
        try {
            const response = await fetch(`https://localhost:7184/api/TaskScheduler/complete-task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Görev baþarýyla tamamlandý.");
                fetchTasks(); // Görev tamamlandýktan sonra listeyi yenile
                fetchCompletedTasks(); // Tamamlanmýþ görevleri yeniden yükle
            } else {
                const errorData = await response.json();
                console.error("Sunucu hatasý:", errorData);
                alert(errorData.message || "Görev tamamlanamadý.");
            }
        } catch (error) {
            console.error("Görev tamamlama sýrasýnda hata oluþtu:", error);
            alert("Görev tamamlanýrken bir hata oluþtu.");
        }
    };

    const upcomingTasks = tasks.filter((t) => !t.done);

    return (
        <main>
            <div className="task-form">
                <input
                    type="text"
                    id="task"
                    placeholder="Görev girin..."
                    value={task}
                    onChange={handleTaskChange}
                />
                <select id="priority" value={priority} onChange={handlePriorityChange}>
                    <option value="top">Yüksek Öncelik</option>
                    <option value="middle">Orta Öncelik</option>
                    <option value="low">Düþük Öncelik</option>
                </select>
                <input
                    type="date"
                    id="deadline"
                    value={dueDate}
                    onChange={handleDueDateChange}
                />
                <button id="add-task" onClick={addTask}>
                    Ekle
                </button>
            </div>

            <h2 className="heading">Aktif Görevler</h2>
            <div className="task-list" id="task-list">
                <table>
                    <thead>
                        <tr>
                            <th>Görev Adý</th>
                            <th>Öncelik</th>
                            <th>Teslim Tarihi</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingTasks.map((t) => (
                            <tr key={t.id}>
                                <td>{t.taskName}</td>
                                <td>{t.priority}</td>
                                <td>{t.deadline}</td>
                                <td>
                                    {!t.done && (
                                        <button
                                            className="mark-done"
                                            onClick={() => markDone(t.id)}
                                        >
                                            Tamamla
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="completed-task-list">
                <h2 className="cheading">Tamamlanmýþ Görevler</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Görev Adý</th>
                            <th>Öncelik</th>
                            <th>Teslim Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedTasks.map((ct) => (
                            <tr key={ct.id}>
                                <td>{ct.taskName}</td>
                                <td>{ct.priority}</td>
                                <td>{ct.deadline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default TaskScheduler;
