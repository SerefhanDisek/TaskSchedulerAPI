import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import "../styles/TaskDistribution.css";

function TaskDistribution({ tasks, users, setTasks }) {
    const [taskAssignments, setTaskAssignments] = useState([]);

    const distributeTasks = () => {
        if (tasks.length === 0 || users.length === 0) {
            alert("Atanacak gorev veya kullanici yok.");
            return;
        }

        const assignments = [];
        let userIndex = 0;

        tasks.forEach((task) => {
            if (!task.done) {
                const assignedUser = users[userIndex];

                assignments.push({ taskId: task.id, userId: assignedUser.id });
                userIndex = (userIndex + 1) % users.length;
            }
        });

        setTaskAssignments(assignments);
    };

    const confirmAssignments = () => {
        const updatedTasks = tasks.map((task) => {
            const assignment = taskAssignments.find(
                (a) => a.taskId === task.id
            );
            if (assignment) {
                return { ...task, assignedTo: assignment.userId };
            }
            return task;
        });

        setTasks(updatedTasks);
        alert("Gorevler basariyla kullanicilar arasinda dagitildi!");
    };

    useEffect(() => {
        distributeTasks(); 
    }, [tasks, users]);

    return (
        <div>
            <h2>Gorev Dagitimi</h2>
            <table>
                <thead>
                    <tr>
                        <th>Gorev</th>
                        <th>Atanan Kullanici</th>
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
            <button onClick={confirmAssignments}>Atamalari Onayla</button>
        </div>
    );
}

TaskDistribution.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            task: PropTypes.string.isRequired,
            done: PropTypes.bool.isRequired,
            assignedTo: PropTypes.number 
        })
    ).isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    setTasks: PropTypes.func.isRequired
};

export default TaskDistribution;
