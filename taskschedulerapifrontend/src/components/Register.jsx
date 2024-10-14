import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:7184/api/auth/register', {
                username,
                password,
                email,
            });
            // Ba�ar�l� kay�t sonras� y�nlendirme veya mesaj g�sterimi
        } catch (error) {
            setError("Kay�t hatas�: " + error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullan�c� Ad�" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parola" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Kay�t Ol</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;
