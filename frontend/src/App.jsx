import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import TaskScheduler from "./components/TaskScheduler";
import Tasks from "./components/Tasks"; 

function App() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [deadline, setDeadline] = useState("");

    const handleTaskChange = (e) => setTask(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);
    const handleDeadlineChange = (e) => setDeadline(e.target.value);

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
        const updatedTasks = tasks.map((t) => t.id === id ? { ...t, done: true } : t);
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
                <h1>Gorev Planlama</h1>
                <nav className="nav-bar">
                    <Link to="/" className="nav-link">Ana Sayfa</Link>
                    <Link to="/register" className="nav-link">Kayit Ol</Link>
                    <Link to="/login" className="nav-link">Giris Yap</Link>
                </nav>
            </header>

            <div className="layout">
                <aside className="sidebar">
                    <Link to="/users" className="nav-link">Kullanicilar</Link>
                    <Link to="/tasks" className="nav-link">Gorevler</Link>
                    <Link to="/task-distribution" className="nav-link">Gorev Dagitimi</Link>
                    <Link to="/task-planning" className="nav-link">Gorev Planlama</Link>
                </aside>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <main>
                                <div className="task-form">
                                    <input
                                        type="text"
                                        id="task"
                                        placeholder="Grev girin..."
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
                    <Route path="/task-planning" element={<TaskScheduler />} />
                    <Route path="/tasks" element={<Tasks />} /> {/* Görevler sayfasý */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
