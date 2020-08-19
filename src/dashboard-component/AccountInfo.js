import React from 'react'
import { connect } from 'react-redux'
import totalExpense from '../redux/total-expense'

export const AccountInfo = ({ expenses }) => {
    return (
        <div>
            <p>Total expenses: {expenses.length} </p>
            <p>Sum of expenses:  {totalExpense(expenses)}&euro;</p>
        </div>

    )
}

export default connect((state) => ({
    expenses: state.expenses
}))(AccountInfo)
