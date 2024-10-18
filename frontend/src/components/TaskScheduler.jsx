import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/TaskScheduler.css"; // Import your CSS file here 
import RegisterPage from "./components/RegisterPage"; // Import Register page
import LoginPage from "./components/LoginPage"; // Import Login page

function App() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [deadline, setDeadline] = useState("");

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };

    const addTask = () => {
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
            id: tasks.length + 1,
            task,
            priority,
            deadline,
            done: false,
        };

        setTasks([...tasks, newTask]);

        setTask("");
        setPriority("top");
        setDeadline("");
    };

    const markDone = (id) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, done: true } : t
        );
        setTasks(updatedTasks);

        const completedTask = tasks.find((t) => t.id === id);
        if (completedTask) {
            setCompletedTasks([...completedTasks, completedTask]);
        }
    };

    const upcomingTasks = tasks.filter((t) => !t.done);

    return (
        <Router>
            <header>
                <h1>Gorev Yonetimi</h1>
                <nav className="nav-bar">
                    <Link to="/" className="nav-link">Ana sayfa</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </nav>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <div className="task-form">
                                <input
                                    type="text"
                                    id="task"
                                    placeholder="Enter task..."
                                    value={task}
                                    onChange={handleTaskChange}
                                />
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={handlePriorityChange}
                                >
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
                                    Add Task
                                </button>
                            </div>

                            <h2 className="heading">Upcoming Tasks</h2>
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
                                                <td>{t.task}</td>
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
                                <h2 className="cheading">Tamamlanis Gorevler</h2>
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
                                                <td>{ct.task}</td>
                                                <td>{ct.priority}</td>
                                                <td>{ct.deadline}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
