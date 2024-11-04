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
            alert("L�tfen bir g�rev ve ge�erli bir teslim tarihi girin.");
            return;
        }

        const selectedDate = new Date(dueDate);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            alert("L�tfen ileri bir tarih se�in.");
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
                alert("G�rev eklenemedi.");
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
                alert("G�rev ba�ar�yla tamamland�.");
                fetchTasks(); // G�rev tamamland�ktan sonra listeyi yenile
                fetchCompletedTasks(); // Tamamlanm�� g�revleri yeniden y�kle
            } else {
                const errorData = await response.json();
                console.error("Sunucu hatas�:", errorData);
                alert(errorData.message || "G�rev tamamlanamad�.");
            }
        } catch (error) {
            console.error("G�rev tamamlama s�ras�nda hata olu�tu:", error);
            alert("G�rev tamamlan�rken bir hata olu�tu.");
        }
    };

    const upcomingTasks = tasks.filter((t) => !t.done);

    return (
        <main>
            <div className="task-form">
                <input
                    type="text"
                    id="task"
                    placeholder="G�rev girin..."
                    value={task}
                    onChange={handleTaskChange}
                />
                <select id="priority" value={priority} onChange={handlePriorityChange}>
                    <option value="top">Y�ksek �ncelik</option>
                    <option value="middle">Orta �ncelik</option>
                    <option value="low">D���k �ncelik</option>
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

            <h2 className="heading">Aktif G�revler</h2>
            <div className="task-list" id="task-list">
                <table>
                    <thead>
                        <tr>
                            <th>G�rev Ad�</th>
                            <th>�ncelik</th>
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
                <h2 className="cheading">Tamamlanm�� G�revler</h2>
                <table>
                    <thead>
                        <tr>
                            <th>G�rev Ad�</th>
                            <th>�ncelik</th>
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
