import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';  // Stil dosyasýný import ediyoruz

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
        </Router>
    );
};

export default App;
