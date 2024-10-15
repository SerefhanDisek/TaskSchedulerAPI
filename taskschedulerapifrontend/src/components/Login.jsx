import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Giris formu gonderildi:', formData);
    };

    return (
        <div>
            <h1>Giris Yap</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Kullanici Adi"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Sifre"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Giris Yap</button>
            </form>
        </div>
    );
};

export default Login;
