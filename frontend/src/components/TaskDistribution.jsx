import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/TaskDistribution.css";
import axios from "axios";

const API_URL = "https://localhost:7184/api/TaskDistribution";

function TaskDistribution({ updateTasks }) {
    const [tasks, setTaskList] = useState([]);
    const [users, setUsers] = useState([]);
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");

    const fetchTasksAndUsers = async () => {
        try {
            const [tasksResponse, usersResponse] = await Promise.all([
                axios.get(`${API_URL}/get-active-tasks`),
                axios.get(`${API_URL}/get-users`)
            ]);
            setTaskList(tasksResponse.data);
            setUsers(usersResponse.data);
            updateTasks(tasksResponse.data); 
        } catch (error) {
            console.error("Görevler ve kullanýcýlar çekilirken hata:", error.response ? error.response.data : error.message);
        }
    };

    const distributeTasks = () => {
        if (tasks.length === 0 || users.length === 0) {
            alert("Atanacak görev veya kullanýcý yok.");
            return;
        }

        const availableTasks = tasks.filter(task => !task.done && !task.assignedTo);
        const assignments = [];
        let userIndex = 0;

        availableTasks.forEach((task) => {
            const assignedUser = users[userIndex];
            assignments.push({ taskId: task.id, userId: assignedUser.id });
            userIndex = (userIndex + 1) % users.length;
        });

        setTaskAssignments(assignments);

        const updatedTasks = tasks.map((task) => {
            const assignment = assignments.find(a => a.taskId === task.id);
            return assignment ? { ...task, assignedTo: assignment.userId } : task;
        });

        setTaskList(updatedTasks);
        updateTasks(updatedTasks); 
    };

    const confirmAssignments = async () => {
        try {
            await axios.put(`${API_URL}/update`, taskAssignments);
            alert("Görevler baþarýyla kullanýcýlara daðýtýldý!");
            fetchTasksAndUsers();
        } catch (error) {
            console.error("Görev daðýtýmýnda hata:", error.response ? error.response.data : error.message);
            alert("Görev daðýtýmýnda bir hata oluþtu.");
        }
    };

    const assignTaskToUser = async () => {
        if (selectedTaskId === "" || selectedUserId === "") {
            alert("Lütfen bir görev ve kullanýcý seçin.");
            return;
        }

        try {
            await axios.post(`${API_URL}/assign`, { taskId: selectedTaskId, userId: selectedUserId });
            alert("Görev baþarýyla kullanýcýya atandý.");
            setSelectedTaskId("");
            setSelectedUserId("");
            fetchTasksAndUsers();
        } catch (error) {
            console.error("Görev atamasýnda hata:", error.response ? error.response.data : error.message);
            alert("Görev atamasýnda bir hata oluþtu.");
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    return (
        <div className="task-distribution-container">
            <h2>Görev Daðýtýmý</h2>
            <button onClick={distributeTasks} className="distribute-button">Rastgele Daðýt</button>
            <table className="task-assignment-table">
                <thead>
                    <tr>
                        <th>Görev</th>
                        <th>Atanan Kullanýcý</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        const assignedUser = users.find((user) => user.id === task.assignedTo);
                        return (
                            <tr key={task.id}>
                                <td>{task.task}</td>
                                <td>{assignedUser ? assignedUser.name : "Atanmamýþ"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={confirmAssignments} className="confirm-button">Atamalarý Onayla</button>

            <h3>Görev Atama</h3>
            <div className="assignment-form">
                <select
                    value={selectedTaskId}
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                    className="select-task"
                >
                    <option value="" disabled>Görev Seçin</option>
                    {tasks.filter(task => !task.done).map(task => (
                        <option key={task.id} value={task.id}>{task.task}</option>
                    ))}
                </select>

                <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="select-user"
                >
                    <option value="" disabled>Kullanýcý Seçin</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>

                <button onClick={assignTaskToUser} className="assign-button">Görev Ata</button>
            </div>
        </div>
    );
}

TaskDistribution.propTypes = {
    updateTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
