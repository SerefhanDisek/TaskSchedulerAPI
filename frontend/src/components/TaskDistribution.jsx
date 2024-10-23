import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/TaskDistribution.css";
import axios from "axios"; 

const API_URL = "https://localhost:7184/api/TaskDistribution"; 

function TaskDistribution({ setTasks }) {
    const [tasks, setTaskList] = useState([]);
    const [users, setUsers] = useState([]);
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fetchTasksAndUsers = async () => {
        try {
            const tasksResponse = await axios.get(`${API_URL}/get-active-tasks`);
            const usersResponse = await axios.get(`${API_URL}/get-users`);
            setTaskList(tasksResponse.data);
            setUsers(usersResponse.data);
        } catch (error) {
            console.error("G�revler ve kullan�c�lar �ekilirken hata:", error);
        }
    };

    const distributeTasks = () => {
        if (tasks.length === 0 || users.length === 0) {
            alert("Atanacak g�rev veya kullan�c� yok.");
            return;
        }

        const availableTasks = tasks.filter(task => !task.done);
        const assignments = [];
        let userIndex = 0;

        availableTasks.forEach((task) => {
            const assignedUser = users[userIndex];
            assignments.push({ taskId: task.id, userId: assignedUser.id });
            userIndex = (userIndex + 1) % users.length;
        });

        setTaskAssignments(assignments);
    };

    const confirmAssignments = async () => {
        const updatedTasks = tasks.map((task) => {
            const assignment = taskAssignments.find(a => a.taskId === task.id);
            if (assignment) {
                return { ...task, assignedTo: assignment.userId };
            }
            return task;
        });

        setTasks(updatedTasks);

        try {
            await axios.post(`${API_URL}/distribute`, updatedTasks);
            alert("G�revler ba�ar�yla kullan�c�lar aras�nda da��t�ld�!");
        } catch (error) {
            console.error("G�rev da��t�m�nda hata:", error);
            alert("G�rev da��t�m�nda bir hata olu�tu.");
        }
    };

    const assignTaskToUser = async () => {
        if (selectedTaskId === null || selectedUserId === null) {
            alert("L�tfen bir g�rev ve kullan�c� se�in.");
            return;
        }

        try {
            await axios.post(`${API_URL}/assign`, { taskId: selectedTaskId, userId: selectedUserId });
            alert("G�rev ba�ar�yla kullan�c�ya atand�.");
            setSelectedTaskId(null);
            setSelectedUserId(null);
            fetchTasksAndUsers(); 
        } catch (error) {
            console.error("G�rev atamas�nda hata:", error);
            alert("G�rev atamas�nda bir hata olu�tu.");
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    return (
        <div>
            <h2>G�rev Da��t�m�</h2>
            <button onClick={distributeTasks}>Rastgele Da��t</button>
            <table>
                <thead>
                    <tr>
                        <th>G�rev</th>
                        <th>Atanan Kullan�c�</th>
                    </tr>
                </thead>
                <tbody>
                    {taskAssignments.map((assignment) => {
                        const task = tasks.find((t) => t.id === assignment.taskId);
                        const user = users.find((u) => u.id === assignment.userId);
                        return (
                            <tr key={assignment.taskId}>
                                <td>{task.task}</td>
                                <td>{user.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={confirmAssignments}>Atamalar� Onayla</button>

            <h3>G�rev Atama</h3>
            <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(Number(e.target.value))}
            >
                <option value="" disabled>G�rev Se�in</option>
                {tasks.filter(task => !task.done).map(task => (
                    <option key={task.id} value={task.id}>{task.task}</option>
                ))}
            </select>

            <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
            >
                <option value="" disabled>Kullan�c� Se�in</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <button onClick={assignTaskToUser}>G�rev Ata</button>
        </div>
    );
}

TaskDistribution.propTypes = {
    setTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
