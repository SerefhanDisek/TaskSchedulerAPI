import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import TaskScheduler from "./components/TaskScheduler";
import Tasks from "./components/Tasks";
import Users from "./components/Users";
import TaskDistribution from "./components/TaskDistribution";
import FirmSelector from "./components/FirmSelector";
import nukonImg1 from "./assets/images/NUKON1.jpg";
import nukonImg2 from "./assets/images/NUKON2.jpg";
import nuriKorustanImg1 from "./assets/images/NKM.jpg";
import nuriKorustanImg2 from "./assets/images/NKM2.jpg";
import nknImg1 from "./assets/images/NKN1.jpg";

const firms = {
    NUKON: [nukonImg1, nukonImg2],
    "NURÝ KÖRÜSTAN MAKÝNE": [nuriKorustanImg1, nuriKorustanImg2],
    NKN: [nknImg1],
};

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, task: "Gorev 1", done: false },
        { id: 2, task: "Gorev 2", done: false }
    ]);

    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("top");
    const [deadline, setDeadline] = useState("");
    const [users] = useState([
        { id: 1, name: "Kullanici 1" },
        { id: 2, name: "Kullanici 2" }
    ]);

    const [currentFirm, setCurrentFirm] = useState("NUKON");
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleTaskChange = (e) => setTask(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);
    const handleDeadlineChange = (e) => setDeadline(e.target.value);

    const addTask = () => {
        if (task.trim() === "" || deadline === "") {
            setErrorMessage("Lütfen bir görev girin ve geçerli bir teslim tarihi seçin.");
            return;
        }

        const selectedDate = new Date(deadline);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            setErrorMessage("Lütfen gelecekteki bir tarih seçin.");
            return;
        }

        setErrorMessage("");

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
                <h1>Gorev Planlama</h1>
                <nav className="nav-bar">
                    <Link to="/" className="nav-link">Ana Sayfa</Link>
                    <Link to="/register" className="nav-link">Kayit Ol</Link>
                    <Link to="/login" className="nav-link">Giris Yap</Link>
                </nav>
                <FirmSelector onSelectFirm={setCurrentFirm} />
            </header>

            <div className="layout">
                <Sidebar />

                <img src={firms[currentFirm][0]} alt={currentFirm} className="firm-image" />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <main>
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
                                        Ekle
                                    </button>
                                </div>

                                {errorMessage && <div className="error-message">{errorMessage}</div>} 

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
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/users" element={<Users />} />
                    <Route
                        path="/task-distribution"
                        element={<TaskDistribution tasks={tasks} users={users} updateTasks={setTasks} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

const Sidebar = () => {
    const location = useLocation();

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <aside className="sidebar">
            <Link to="/users" className="nav-link">Kullanicilar</Link>
            <Link to="/tasks" className="nav-link">Gorevler</Link>
            <Link to="/task-distribution" className="nav-link">Gorev Dagitimi</Link>
            <Link to="/task-planning" className="nav-link">Gorev Planlama</Link>
        </aside>
    );
};

export default App;
