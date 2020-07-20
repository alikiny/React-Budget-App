import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getExpenses } from '../redux/selectors'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { CustomToolbar } from './TooBar'
import { CustomTableHead } from './TableHead'
import { removeExpense } from '../redux/expenses'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import moment from 'moment'
import ExpenseModal from './ExpenseForm'


function createExpense(id, name, amount, date, note) {
    return { id, name, amount, date, note }

}


function EnhancedTable(props) {
    const rows = props.rows
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openModal, setOpen] = useState(false)
    const [currentExpense, setExpense] = useState()
    const [isEdit, setEdit] = useState(true)
    const closeModal = () => {
        setOpen(false)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const match = (array1, array2) => {
        const tobeDelete = []
        array1.forEach(item1 => {
            array2.forEach((item2) => {
                if (item2.name === item1) {
                    tobeDelete.push(item2)

                }
            })
        })
        return tobeDelete
    }

    const onDelete = () => {
        const tobeDelete = match(selected, rows)
        tobeDelete.forEach(item =>
            props.deleteItem(item)
        )
        setSelected([])
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <ExpenseModal openModal={openModal} closeModal={closeModal} expense={currentExpense} edit={isEdit} />
            <Paper className={classes.paper}>
                <CustomToolbar numSelected={selected.length} classes={classes} onDelete={onDelete} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <CustomTableHead
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />

                        <TableBody>
                            {rows.length === 0 && (
                                <tr>
                                    <td colspan="6">There is no expense</td>
                                </tr>
                            )}
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                let date = new Date(row.date)
                                const newdate = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")

                                return (

                                    <TableRow
                                        hover

                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >

                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row.name)}
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.amount}</TableCell>
                                        <TableCell align="left">{newdate}</TableCell>
                                        <TableCell align="left">{row.note}</TableCell>
                                        <TableCell align="left" onClick={
                                            () => {
                                                setExpense(row)
                                                setOpen(true)
                                            }
                                        }>Edit</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (


                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>



                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>



            <Tooltip title='Back to top' style={styles.backToTop}>
                <IconButton onClick={() => window.scroll(0, 0)}>
                    <ArrowUpwardIcon />
                </IconButton>
            </Tooltip>


        </div>
    );
}

export const ExpenseList = (props) => {

    const deleteItem = (expense) => {
        props.dispatch(removeExpense(expense.id))
    }

    const rows = props.expenses.map((expense, index) => {
        return createExpense(expense.id, expense.description, expense.amount,
            expense.createdAt, expense.note)
    })

    return (
        <div>
            <div style={styles.expenseList}>
                <EnhancedTable rows={rows} deleteItem={deleteItem} />
            </div>

        </div>


    )
}

export default connect((state) => {
    return {
        expenses: getExpenses(state.expenses, state.filters),
    }
})(ExpenseList)

const styles = {
    expenseList: {
        color: 'white',
        textAlign: 'center'
    },
    backToTop: {
        position: 'fixed',
        bottom: '10%',
        right: '2%'
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
}));