import { useEffect, useState } from "react";
import "../styles/Users.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("RegularUser");
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch("https://localhost:7184/api/User"); // API adresini güncelle
        const data = await response.json();
        setUsers(data);
    };

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);

    const addUser = async () => {
        if (firstName.trim() === "" || email.trim() === "") {
            alert("Lutfen bir isim ve e-posta girin.");
            return;
        }

        const userDto = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Roles: role,
            Password: "defaultPassword123" // Þifreyi gerektiði þekilde ayarlayabilirsin
        };

        if (editingUserId) {
            await updateUser(editingUserId, userDto);
        } else {
            await createUser(userDto);
        }

        resetForm();
    };

    const createUser = async (userDto) => {
        const response = await fetch("https://localhost:7184/api/User", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDto),
        });

        if (response.ok) {
            fetchUsers();
        } else {
            alert("Kullanýcý oluþturulamadý.");
        }
    };

    const updateUser = async (id, userDto) => {
        const response = await fetch(`https://localhost:7184/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDto),
        });

        if (response.ok) {
            fetchUsers();
            setEditingUserId(null);
        } else {
            alert("Kullanýcý güncellenemedi.");
        }
    };

    const deleteUser = async (id) => {
        const response = await fetch(`https://localhost:7184/api/user/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            fetchUsers();
        } else {
            alert("Kullanýcý silinemedi.");
        }
    };

    const editUser = (userToEdit) => {
        setFirstName(userToEdit.firstName);
        setLastName(userToEdit.lastName);
        setEmail(userToEdit.email);
        setRole(userToEdit.roles);
        setEditingUserId(userToEdit.id);
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("RegularUser");
        setEditingUserId(null);
    };

    return (
        <main>
            <h2 className="heading">{editingUserId ? "Kullaniciyi Guncelle" : "Yeni Kullanici Ekle"}</h2>
            <div className="user-form">
                <input
                    type="text"
                    id="first-name"
                    placeholder="Ýsim girin..."
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
                <input
                    type="text"
                    id="last-name"
                    placeholder="Soyisim girin..."
                    value={lastName}
                    onChange={handleLastNameChange}
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
                            <th>Ýsim</th>
                            <th>Soyisim</th>
                            <th>E-posta</th>
                            <th>Rol</th>
                            <th>Ýþlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.roles}</td>
                                <td>
                                    <button onClick={() => editUser(u)}>
                                        Düzenle
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
