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

            console.log("Tasks Response:", tasksResponse.data);
            console.log("Users Response:", usersResponse.data);

            setTaskList(tasksResponse.data);
            setUsers(usersResponse.data);
            updateTasks(tasksResponse.data);
        } catch (error) {
            console.error("Gorevler veya kullanicilar cekilirken hata:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    return (
        <div className="task-distribution-container">
            <h2>Gorev Dagitimi</h2>
            <table className="task-assignment-table">
                <thead>
                    <tr>
                        <th>Gorev</th>
                        <th>Atanan Kullanici</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>
                                    {task.AssignedUsers && task.AssignedUsers.length > 0
                                        ? task.AssignedUsers.map(assignedUserId => {
                                            const user = users.find(user => user.id === assignedUserId);
                                            console.log("Task ID:", task.id);
                                            console.log("Assigned User ID:", assignedUserId);
                                            console.log("Available Users:", users);
                                            return user ? `${user.firstName} ${user.lastName}` : null; 
                                        }).filter(name => name).join(", ") 
                                        : "Atanmamis"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Gorev bulunamadi.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

TaskDistribution.propTypes = {
    updateTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
