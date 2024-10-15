// src/components/AssignTaskForm.js
import { useEffect, useState } from 'react';
import Form, { Item } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import Button from 'devextreme-react/button';
import axios from 'axios';

const AssignTaskForm = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Görevler ve kullanýcýlarý API'den alýyoruz
        axios.get('http://localhost:5000/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));

        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleAssign = () => {
        if (selectedTask && selectedUser) {
            axios.post('http://localhost:5000/api/tasks/assign', {
                taskId: selectedTask.id,
                userId: selectedUser.id
            })
                .then(() => {
                    console.log('Task assigned successfully');
                })
                .catch(error => console.error('Error assigning task:', error));
        } else {
            alert('Please select both a task and a user');
        }
    };

    return (
        <div>
            <h3>Assign Task to User</h3>
            <Form>
                <Item>
                    <SelectBox
                        dataSource={tasks}
                        displayExpr="title"
                        valueExpr="id"
                        onValueChanged={(e) => setSelectedTask(e.value)}
                        placeholder="Select Task"
                    />
                </Item>
                <Item>
                    <SelectBox
                        dataSource={users}
                        displayExpr="name"
                        valueExpr="id"
                        onValueChanged={(e) => setSelectedUser(e.value)}
                        placeholder="Select User"
                    />
                </Item>
                <Item>
                    <Button
                        text="Assign Task"
                        onClick={handleAssign}
                    />
                </Item>
            </Form>
        </div>
    );
};

export default AssignTaskForm;
