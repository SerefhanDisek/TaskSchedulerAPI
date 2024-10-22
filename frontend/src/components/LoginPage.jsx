import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            userName,
            password,
        };

        try {
            const response = await fetch('https://localhost:7184/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.Message || 'Giris basarili!');

                setTimeout(() => {
                    navigate('/task-planning'); 
                }, 2000);
            } else {
                setErrorMessage(data.Message || 'Giris basarisiz oldu!');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Sunucuya baglanirken bir hata olustu!');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Giris Yap</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Kullanici Adi"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Sifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Giris Yap</button>
            </form>
        </div>
    );
};

export default LoginPage;
