import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/TaskDistribution.css";
import axios from "axios";

const API_URL = "https://localhost:7184/api/TaskDistribution";

function TaskDistribution({ updateTasks }) {
    const [tasks, setTaskList] = useState([]);

    const fetchTasksAndUsers = async () => {
        try {
            const [tasksResponse, usersResponse] = await Promise.all([
                axios.get(`${API_URL}/get-active-tasks`),
                axios.get(`${API_URL}/get-users`)
            ]);

            console.log("Gorevler API Yaniti:", tasksResponse.data);
            console.log("Kullanicilar API Yaniti:", usersResponse.data);

            const usersById = {};
            usersResponse.data.forEach(user => {
                usersById[user.id] = `${user.firstName} ${user.lastName}`;
            });

            const tasksWithUserNames = tasksResponse.data.map(task => {
                const assignedUserNames = task.assignedUsers && task.assignedUsers.length > 0
                    ? task.assignedUsers.map(userId => usersById[userId] || "Atanmamis")
                    : ["Atanmamis"];

                console.log(`Task ID: ${task.id}, Assigned User Names: ${assignedUserNames}`);

                return {
                    ...task,
                    assignedUserNames,
                };
            });

            setTaskList(tasksWithUserNames);
            updateTasks(tasksWithUserNames);
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
                                    {task.assignedUserNames && task.assignedUserNames.length > 0
                                        ? task.assignedUserNames.join(", ")
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
