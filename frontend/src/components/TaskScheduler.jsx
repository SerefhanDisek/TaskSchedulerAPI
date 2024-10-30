import { useState, useEffect } from "react";
import "../styles/TaskScheduler.css";

function TaskScheduler() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [deadline, setDeadline] = useState("");

    // Load tasks from backend on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetch tasks from API
    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/tasks");
            const data = await response.json();
            setTasks(data.filter((task) => !task.done));
            setCompletedTasks(data.filter((task) => task.done));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleTaskChange = (e) => setTask(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);
    const handleDeadlineChange = (e) => setDeadline(e.target.value);

    // Add task through API
    const addTask = async () => {
        if (task.trim() === "" || deadline === "") {
            alert("Please enter a task and select a valid deadline.");
            return;
        }

        const selectedDate = new Date(deadline);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            alert("Please select a future date for the deadline.");
            return;
        }

        const newTask = {
            taskName: task,
            priority,
            deadline,
        };

        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
            if (response.ok) {
                fetchTasks(); // Refresh tasks after adding
                setTask("");
                setPriority("top");
                setDeadline("");
            } else {
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Mark task as complete through API
    const markDone = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}/complete`, {
                method: "PUT",
            });
            if (response.ok) {
                fetchTasks(); // Refresh tasks after marking complete
            } else {
                alert("Failed to mark task as complete.");
            }
        } catch (error) {
            console.error("Error marking task as complete:", error);
        }
    };

    const upcomingTasks = tasks.filter((t) => !t.done);

    return (
        <main>
            <div className="task-form">
                <input
                    type="text"
                    id="task"
                    placeholder="Enter task..."
                    value={task}
                    onChange={handleTaskChange}
                />
                <select id="priority" value={priority} onChange={handlePriorityChange}>
                    <option value="top">Top Priority</option>
                    <option value="middle">Middle Priority</option>
                    <option value="low">Less Priority</option>
                </select>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={handleDeadlineChange}
                />
                <button id="add-task" onClick={addTask}>
                    Ekle
                </button>
            </div>

            <h2 className="heading">Aktif Gorevler</h2>
            <div className="task-list" id="task-list">
                <table>
                    <thead>
                        <tr>
                            <th>Gorev Adi</th>
                            <th>Oncelik</th>
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
                <h2 className="cheading">Tamamlanmis Gorevler</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Gorev Adi</th>
                            <th>Oncelik</th>
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
