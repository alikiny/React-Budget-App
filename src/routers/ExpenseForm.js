import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import { startEditExpense,startAddAction } from '../redux/expenses'


const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        margin: 'auto',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

        '& .MuiFormControl-root': {
            margin: '10px',
            width: '100%'
        }
    },
    addIcon: {
        color: 'white',
        backgroundColor: '#4c2341'
    }
}));

export const ExpenseModal = (props) => {
    const expense = props.expense

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [date, setDate] = useState(new Date(Date.now()))

    useEffect(() => {
        if (expense) {
            setName(expense.name)
            setAmount(expense.amount)
            setNote(expense.note)
            setDate(expense.date)
        }
    })

    const classes = useStyles()
    const onSave = () => {


        const alertText = []
        const nameList = props.expenses.map((ex) => ex.description)
        const itemAmount = parseFloat(amount)
        const getDate = new Date(date)
        const getTime = getDate.getTime()


        if (Number.isNaN(itemAmount)) {
            alertText.push("Amount is required")
        }


        if (name.length < 1) {
            alertText.push("Name is required")
        } else if (!props.edit && nameList.includes(name)) {
            alertText.push("Name is already taken")
        }

        //Check if there is no error, continue to add or edit expenses

        if (alertText.length < 1) {

            //Check if the command is to edit or add expense
            if (props.edit) {

                
                const itemToDelete = props.expenses.filter((e) => {
                    return e.id === props.expense.id
                })

                const toBeDeleted=itemToDelete[0]
                
                if (
                    toBeDeleted.description === name
                    && toBeDeleted.amount ==amount
                    && toBeDeleted.note ===note
                    && toBeDeleted.createdAt ==getTime
                ) {
                    alert('There is no change made')
                } else {
                    console.log('edit modal')
                    props.startEditExpense(
                        toBeDeleted.id,
                        {
                            description: name,
                            note,
                            amount:itemAmount,
                            createdAt: getTime
                        }
                    )
                    
                }


                //Add expense incase 'edit ' is set to false
            } else {
                props.addExpense({
                    description: name,
                    note,
                    amount:itemAmount,
                    createdAt: getTime
                })
                console.log('added new expense')
            }

            props.closeModal()
            
        } 
        /* else {
            alert(alertText)
        } */
        setName('')
        setAmount('')
        setNote('')
        setDate(new Date(Date.now()))

        

    }


    return (
        <Modal
            open={props.openModal}
            onClose={props.closeModal}>
            <div className={classes.paper}>
                <TextField
                    label="Name"
                    id='item-name'
                    value={expense ? expense.name : name}
                    onChange={(e) => {
                        if (expense) {
                            expense.name = e.target.value
                        }
                        setName(e.target.value)
                    }
                    }
                    variant="outlined"
                ></TextField>

                <TextField
                    label="Amount"
                    id='item-amount'
                    type="number"
                    value={expense ? expense.amount : amount}
                    onChange={(e) => {
                        if (expense) { expense.amount = e.target.value }
                        setAmount(e.target.value)

                    }}
                    variant="outlined"
                ></TextField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    id='item-date'
                        disableToolbar
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value={expense ? expense.date : date}
                        label="Date"
                        onChange={
                            (date) => {
                                setDate(date)
                                if(expense){
                                    expense.date = date
                                }
                                
                            }
                        }
                        KeyboardButtonProps={{
                            'aria-label': 'set date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <TextField
                    label="Note"
                    id='item-note'
                    value={expense ? expense.note : note}
                    onChange={(e) => {
                        setNote(e.target.value)
                        if(expense){expense.note = e.target.value}
                    }}
                    variant="outlined"
                ></TextField>

                <div>
                    <IconButton id="save-btn" onClick={() => onSave()}>
                        <AddCircleIcon className={classes.addIcon} />
                    </IconButton>
                    <IconButton id="close-btn" onClick={() => props.closeModal()}>
                        <CancelIcon className={classes.addIcon} />
                    </IconButton>
                </div>



            </div>



        </Modal>
    )
}

const mapDispatchToProps=dispatch=>({
    addExpense: (expense)=>dispatch(startAddAction(expense)),
    startEditExpense:(id,expense)=>dispatch(startEditExpense(id,expense))
})

const mapStateToProps=state=>({
    expenses:state.expenses
})
export default connect(mapStateToProps,mapDispatchToProps)(ExpenseModal)