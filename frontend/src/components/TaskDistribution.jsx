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
            console.error("G�revler ve kullan�c�lar �ekilirken hata:", error.response ? error.response.data : error.message);
        }
    };

    const distributeTasks = () => {
        if (tasks.length === 0 || users.length === 0) {
            alert("Atanacak g�rev veya kullan�c� yok.");
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
            alert("G�revler ba�ar�yla kullan�c�lara da��t�ld�!");
            fetchTasksAndUsers();
        } catch (error) {
            console.error("G�rev da��t�m�nda hata:", error.response ? error.response.data : error.message);
            alert("G�rev da��t�m�nda bir hata olu�tu.");
        }
    };

    const assignTaskToUser = async () => {
        if (selectedTaskId === "" || selectedUserId === "") {
            alert("L�tfen bir g�rev ve kullan�c� se�in.");
            return;
        }

        try {
            await axios.post(`${API_URL}/assign`, { taskId: selectedTaskId, userId: selectedUserId });
            alert("G�rev ba�ar�yla kullan�c�ya atand�.");
            setSelectedTaskId("");
            setSelectedUserId("");
            fetchTasksAndUsers();
        } catch (error) {
            console.error("G�rev atamas�nda hata:", error.response ? error.response.data : error.message);
            alert("G�rev atamas�nda bir hata olu�tu.");
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    return (
        <div className="task-distribution-container">
            <h2>G�rev Da��t�m�</h2>
            <button onClick={distributeTasks} className="distribute-button">Rastgele Da��t</button>
            <table className="task-assignment-table">
                <thead>
                    <tr>
                        <th>G�rev</th>
                        <th>Atanan Kullan�c�</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        const assignedUser = users.find((user) => user.id === task.assignedTo);
                        return (
                            <tr key={task.id}>
                                <td>{task.task}</td>
                                <td>{assignedUser ? assignedUser.name : "Atanmam��"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={confirmAssignments} className="confirm-button">Atamalar� Onayla</button>

            <h3>G�rev Atama</h3>
            <div className="assignment-form">
                <select
                    value={selectedTaskId}
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                    className="select-task"
                >
                    <option value="" disabled>G�rev Se�in</option>
                    {tasks.filter(task => !task.done).map(task => (
                        <option key={task.id} value={task.id}>{task.task}</option>
                    ))}
                </select>

                <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="select-user"
                >
                    <option value="" disabled>Kullan�c� Se�in</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>

                <button onClick={assignTaskToUser} className="assign-button">G�rev Ata</button>
            </div>
        </div>
    );
}

TaskDistribution.propTypes = {
    updateTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
