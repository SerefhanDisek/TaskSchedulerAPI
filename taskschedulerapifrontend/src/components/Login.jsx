import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7184/api/auth/login', {
                username,
                password,
            });
            // Tokeni kaydedin ve yönlendirin
            localStorage.setItem('token', response.data);
            // Giriþ sonrasý yönlendirme veya mesaj gösterimi
        } catch (error) {
            setError("Giriþ hatasý: " + error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullanýcý Adý" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parola" required />
            <button type="submit">Giriþ Yap</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
