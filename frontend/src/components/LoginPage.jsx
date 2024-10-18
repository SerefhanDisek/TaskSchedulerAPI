import { useState } from "react";

function LoginPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        // Backend API'ye istek gönderebilirsiniz
    };

    return (
        <div>
            <h2>Giriþ Yap</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
                <button type="submit">Giriþ Yap</button>
            </form>
        </div>
    );
}

export default LoginPage;
