
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import { datetFilter, sortFilter, textFilter } from '../redux/filters'
import {getExpenses} from '../redux/selectors'

const useStyles = makeStyles((theme) => ({
    root: {
        background:'#25001b',
        textAlign:'center',
        padding:'20px',
        margin:'20px',
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '25ch',
            backgroundColor:'white'
            
        },
        '& .MuiFormLabel-root':{
            color:'black'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink':{
            transform: 'translate(20px, -20px) scale(0.75)',
            color:'white'
        }
    },
    form:{
        backgroundColor:'rgba(255,255,255,0.2)',
    },
    searchButton:{
        backgroundColor: '#4c2341',
        color:'white',
        marginTop:theme.spacing(6)
    }
}));



export const FilterExpense = (props) => {
   const[sort,setSort]=useState('Date')
    const classes = useStyles()
    const onSearch = () => {
    
        props.dispatch(textFilter(props.filters.text))
        props.dispatch(sortFilter(props.filters.sortBy))
        props.dispatch(datetFilter(props.filters.startDate,props.filters.endDate))
        console.log(getExpenses(props.expenses,props.filters))
    }

    const handleStartDateChange = (date) => {
        props.filters.startDate=date
    }

    const handleEndDateChange = (date) => {
        props.filters.endDate=date
    }

    const handleChange = (e) => {
      
        props.filters.sortBy=e.target.value   
        setSort(props.filters.sortBy)
    }

    const handleTextChange = (e) => {
        props.filters.text=e.target.value
       
    }
    return (
        <div className={classes.root}>
            <form className={classes.form}>

                <TextField
                    label="Text filter"
                    defaultValue={props.filters.text}
                    onChange={(e)=>handleTextChange(e)}
                    id="outlined-start-adornment"
                    variant="outlined"
                ></TextField>


                <TextField
                    label="Sort By"
                    select
                    value={sort}
                    onChange={handleChange}
                    id="outlined-start-adornment"
                    variant="outlined"
                >
                    <MenuItem value='Date'>Date</MenuItem>
                    <MenuItem value='Amount'>Amount</MenuItem>
                </TextField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                        disableToolbar
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        
                        label="Start Date"
                        value={props.filters.startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change start date',
                        }}
                    />

                    <KeyboardDatePicker
                        disableToolbar
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                       
                        label="End Date"
                        value={props.filters.endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change end date',
                        }}
                    />
                </MuiPickersUtilsProvider>

            </form>
            <Button variant="contained" className={classes.searchButton} onClick={onSearch}>
                Search
    </Button>
        </div>
    )
}

export default connect((state) => {
    return {
        filters: state.filters,
        expenses:state.expenses
    }
})(FilterExpense)