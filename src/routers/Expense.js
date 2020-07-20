import React from 'react';
import ExpenseList from './ExpenseList'
import FilterExpense from '../routers/FilterExpense'



const Expenses = () => (
    <div>
        <FilterExpense />
        <ExpenseList />
    </div>

)


export default Expenses
