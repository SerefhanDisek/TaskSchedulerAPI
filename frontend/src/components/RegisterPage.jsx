import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            userName,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:7184/api/Auth/register', {  // API URL'sini uygun bir þekilde ayarlayýn
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.Message || 'Kayit islemi basarili!'); 
                setTimeout(() => {
                    navigate('/profile'); 
                }, 2000);
            } else {
                setErrorMessage(data.Message || 'Kayit islemi basarisiz oldu!'); 
            }
        } catch (error) {
            console.error('Error:', error);  
            setErrorMessage('Sunucuya baglanirken bir hata olustu!'); 
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Kayit Ol</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Isim"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Soy Isim"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Kullanici Adi"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Sifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Kayit Ol</button>
            </form>
        </div>
    );
};

export default RegisterPage;
