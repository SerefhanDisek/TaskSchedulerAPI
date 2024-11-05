import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/TaskDistribution.css";
import axios from "axios";

const API_URL = "https://localhost:7184/api/TaskDistribution";

function TaskDistribution({ updateTasks }) {
    const [tasks, setTaskList] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchTasksAndUsers = async () => {
        try {
            const [tasksResponse, usersResponse] = await Promise.all([
                axios.get(`${API_URL}/get-active-tasks`),
                axios.get(`${API_URL}/get-users`)
            ]);

            console.log("Tasks Data:", tasksResponse.data); // Konsolda görev verilerini kontrol edin
            console.log("Users Data:", usersResponse.data); // Konsolda kullanýcý verilerini kontrol edin

            setTaskList(tasksResponse.data);
            setUsers(usersResponse.data);
            updateTasks(tasksResponse.data);
        } catch (error) {
            console.error("Görevler ve kullanýcýlar çekilirken hata:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    const getUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : "Atanmamýþ";
    };

    return (
        <div className="task-distribution-container">
            <h2>Görev Daðýtýmý</h2>
            <table className="task-assignment-table">
                <thead>
                    <tr>
                        <th>Görev</th>
                        <th>Atanan Kullanýcý</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name || task.taskName}</td> {/* task.name veya task.taskName olarak kontrol edin */}
                            <td>{getUserName(task.assignedUserId || task.assignedTo)}</td> {/* assignedUserId veya assignedTo olarak kontrol edin */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

TaskDistribution.propTypes = {
    updateTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
