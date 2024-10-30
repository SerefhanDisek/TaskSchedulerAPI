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
            console.log("Gorevler:", tasksResponse.data);
            console.log("Kullanicilar:", usersResponse.data);
        } catch (error) {
            console.error("Gorevler ve kullanicilar cekilirken hata:", error.response ? error.response.data : error.message);
        }
    };

    const distributeTasks = () => {
        if (tasks.length === 0 || users.length === 0) {
            alert("Atanacak gorev veya kullanici yok.");
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

        updateTasks(updatedTasks);

        try {
            await axios.post(`${API_URL}/distribute`, taskAssignments);
            alert("Gorevler basariyla kullanicilara dagitildi!");
        } catch (error) {
            console.error("Gorev dagitiminda hata:", error.response ? error.response.data : error.message);
            alert("Gorev dagitiminda bir hata olustu.");
        }
    };

    const assignTaskToUser = async () => {
        if (selectedTaskId === "" || selectedUserId === "") {
            alert("Lutfen bir gorev ve kullanici secin.");
            return;
        }

        try {
            await axios.post(`${API_URL}/assign`, { taskId: selectedTaskId, userId: selectedUserId });
            alert("Gorev basariyla kullaniciya atandi.");
            setSelectedTaskId("");
            setSelectedUserId("");
            fetchTasksAndUsers();
        } catch (error) {
            console.error("Gorev atamasinda hata:", error.response ? error.response.data : error.message);
            alert("Gorev atamasinda bir hata olustu.");
        }
    };

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    return (
        <div>
            <h2>Gorev Dagitimi</h2>
            <button onClick={distributeTasks}>Rastgele Dagit</button>
            <table>
                <thead>
                    <tr>
                        <th>Gorev</th>
                        <th>Atanan Kullanici</th>
                    </tr>
                </thead>
                <tbody>
                    {taskAssignments.map((assignment) => {
                        const task = tasks.find((t) => t.id === assignment.taskId) || {};
                        const user = users.find((u) => u.id === assignment.userId) || {};
                        return (
                            <tr key={assignment.taskId}>
                                <td>{task.task || "Gorev Bulunamadi"}</td>
                                <td>{user.name || "Kullanici Bulunamadi"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={confirmAssignments}>Atamalari Onayla</button>

            <h3>Gorev Atama</h3>
            <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
            >
                <option value="" disabled>Gorev Secin</option>
                {tasks.filter(task => !task.done).map(task => (
                    <option key={task.id} value={task.id}>{task.task}</option>
                ))}
            </select>

            <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
            >
                <option value="" disabled>Kullanici Secin</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <button onClick={assignTaskToUser}>Gorev Ata</button>
        </div>
    );
}

TaskDistribution.propTypes = {
    updateTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
