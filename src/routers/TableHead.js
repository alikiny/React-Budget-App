import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react'

export const CustomTableHead = (props) => {
    
    const { onSelectAllClick, numSelected, rowCount } = props;
    const headCells = [
        { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'Amount', numeric: true, disablePadding: false, label: 'Amount' },
        { id: 'Date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'Note', numeric: false, disablePadding: false, label: 'Note' },
        { id: 'Edit', numeric: false, disablePadding: false, label: '' },
    ];
    return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                        >
                            {headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

    )
}