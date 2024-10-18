import { useState } from "react";

function RegisterPage() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        // Backend API'ye istek gönderebilirsiniz
    };

    return (
        <div>
            <h2>Kayýt Ol</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                <input type="text" name="userName" placeholder="Username" value={form.userName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Kayýt Ol</button>
            </form>
        </div>
    );
}

export default RegisterPage;
