import { useSelector } from 'react-redux';
import { getTransaction } from './transactions.reducer';
import { DataGrid } from '@material-ui/data-grid';
import { FunctionComponent } from 'react';



const columns = [
    { field: 'formatted_timestamp', headerName: 'Timestamp', width: 300 },
    { field: 'from', headerName: 'From', width: 400 },
    { field: 'to', headerName: 'To', width: 400 },
    { field: 'value', headerName: 'Value' },
    { field: 'confirmations', headerName: 'Confirmations' },
    { field: 'hash', headerName: 'Hash', width: 600 },
]



const Transactions: FunctionComponent = () => {
    const rows = useSelector(getTransaction);
    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} />
        </div>
    );
}

export default Transactions;