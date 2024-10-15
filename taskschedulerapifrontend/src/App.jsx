import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';  // Stil dosyas�n� import ediyoruz
import TaskGrid from './components/TaskGrid';
import AssignTaskForm from './components/AssignTaskForm';  // Bu bile�eni ekleyin
import LogGrid from './components/LogGrid';  // Bu bile�eni ekleyin


const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Ana Sayfa</Link>
                <Link to="/register">Kayit Ol</Link>
                <Link to="/login">Giris Yap</Link>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <div>
                <h1>Task Scheduler Dashboard</h1>
                <TaskGrid />
                <AssignTaskForm />
                <h2>System Logs</h2>
                <LogGrid />
            </div>
        </Router>
    );
};

export default App;
