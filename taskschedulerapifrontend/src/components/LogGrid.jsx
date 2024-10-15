// src/components/LogGrid.js
import { useEffect, useState } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import axios from 'axios';

const LogGrid = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/logs')
            .then(response => setLogs(response.data))
            .catch(error => console.error('Error fetching logs:', error));
    }, []);

    return (
        <DataGrid dataSource={logs}>
            <Column dataField="timestamp" caption="Timestamp" dataType="date" />
            <Column dataField="message" caption="Message" />
            <Column dataField="logLevel" caption="Log Level" />
            <Column dataField="userId" caption="User ID" />
        </DataGrid>
    );
};

export default LogGrid;
