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
            console.error("Görevler ve kullanýcýlar çekilirken hata:", error);
        }
    };

    const distributeTasks = () => {
        if (tasks.length === 0 || users.length === 0) {
            alert("Atanacak görev veya kullanýcý yok.");
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
            alert("Görevler baþarýyla kullanýcýlar arasýnda daðýtýldý!");
        } catch (error) {
            console.error("Görev daðýtýmýnda hata:", error);
            alert("Görev daðýtýmýnda bir hata oluþtu.");
        }
    };

    const assignTaskToUser = async () => {
        if (selectedTaskId === null || selectedUserId === null) {
            alert("Lütfen bir görev ve kullanýcý seçin.");
            return;
        }

        try {
            await axios.post(`${API_URL}/assign`, { taskId: selectedTaskId, userId: selectedUserId });
            alert("Görev baþarýyla kullanýcýya atandý.");
            setSelectedTaskId(null);
            setSelectedUserId(null);
            fetchTasksAndUsers(); 
        } catch (error) {
            console.error("Görev atamasýnda hata:", error);
            alert("Görev atamasýnda bir hata oluþtu.");
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    return (
        <div>
            <h2>Görev Daðýtýmý</h2>
            <button onClick={distributeTasks}>Rastgele Daðýt</button>
            <table>
                <thead>
                    <tr>
                        <th>Görev</th>
                        <th>Atanan Kullanýcý</th>
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
            <button onClick={confirmAssignments}>Atamalarý Onayla</button>

            <h3>Görev Atama</h3>
            <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(Number(e.target.value))}
            >
                <option value="" disabled>Görev Seçin</option>
                {tasks.filter(task => !task.done).map(task => (
                    <option key={task.id} value={task.id}>{task.task}</option>
                ))}
            </select>

            <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
            >
                <option value="" disabled>Kullanýcý Seçin</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <button onClick={assignTaskToUser}>Görev Ata</button>
        </div>
    );
}

TaskDistribution.propTypes = {
    setTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
