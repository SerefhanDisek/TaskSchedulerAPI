import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AnaSayfa from './pages/AnaSayfa';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import TasksDistribution from './pages/TasksDistribution';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Ana Sayfa</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<AnaSayfa />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/tasksdistribution" element={<TasksDistribution />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
