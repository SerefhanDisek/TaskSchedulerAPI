import { useState } from "react";
import "../styles/Users.css"; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("RegularUser");
    const [editingUserId, setEditingUserId] = useState(null);

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);

    const addUser = () => {
        if (name.trim() === "" || email.trim() === "") {
            alert("Lutfen bir isim ve e-posta girin.");
            return;
        }

        if (editingUserId) {
            
            const updatedUsers = users.map((u) =>
                u.id === editingUserId ? { ...u, name, email, role } : u
            );
            setUsers(updatedUsers);
            setEditingUserId(null);
        } else {
            
            const newUser = {
                id: users.length + 1,
                name,
                email,
                role,
            };
            setUsers([...users, newUser]);
        }

        setName("");
        setEmail("");
        setRole("RegularUser");
    };

    const editUser = (userToEdit) => {
        setName(userToEdit.name);
        setEmail(userToEdit.email);
        setRole(userToEdit.role);
        setEditingUserId(userToEdit.id);
    };

    const deleteUser = (id) => {
        const updatedUsers = users.filter((u) => u.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <main>
            <h2 className="heading">{editingUserId ? "Kullaniciyi Guncelle" : "Yeni Kullanici Ekle"}</h2>
            <div className="user-form">
                <input
                    type="text"
                    id="name"
                    placeholder="Isim girin..."
                    value={name}
                    onChange={handleNameChange}
                />
                <input
                    type="email"
                    id="email"
                    placeholder="E-posta girin..."
                    value={email}
                    onChange={handleEmailChange}
                />
                <select
                    id="role"
                    value={role}
                    onChange={handleRoleChange}
                >
                    <option value="Admin">Admin</option>
                    <option value="RegularUser">Kullanici</option>
                </select>
                <button id="add-user" onClick={addUser}>
                    {editingUserId ? "Guncelle" : "Ekle"}
                </button>
            </div>

            <h2 className="heading">Kullanicilar</h2>
            <div className="user-list">
                <table>
                    <thead>
                        <tr>
                            <th>Isim</th>
                            <th>E-posta</th>
                            <th>Rol</th>
                            <th>Islemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button onClick={() => editUser(u)}>
                                        Duzenle
                                    </button>
                                    <button onClick={() => deleteUser(u.id)}>
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Users;
