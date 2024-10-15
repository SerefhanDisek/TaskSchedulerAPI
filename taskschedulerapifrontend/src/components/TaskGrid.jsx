// src/components/TaskGrid.js
import { useEffect, useState } from 'react';
import DataGrid, { Column, Paging, FilterRow } from 'devextreme-react/data-grid';
import axios from 'axios';

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // TaskSchedulerAPI projesinden görevleri almak için API çaðrýsý
        axios.get('http://localhost:5000/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <DataGrid
            dataSource={tasks}
            showBorders={true}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
        >
            <FilterRow visible={true} />
            <Paging defaultPageSize={10} />
            <Column dataField="id" caption="Task ID" />
            <Column dataField="title" caption="Title" />
            <Column dataField="assignedUser" caption="Assigned User" />
            <Column dataField="dueDate" caption="Due Date" dataType="date" />
            <Column dataField="status" caption="Status" />
        </DataGrid>
    );
};

export default TaskGrid;
