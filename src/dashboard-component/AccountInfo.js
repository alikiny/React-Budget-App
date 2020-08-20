import React from 'react'
import { connect } from 'react-redux'
import totalCount from '../redux/total-count'

export const AccountInfo = ({ expenses,incomes }) => {
    return (
        <div className="container">
            <div className="row w-50 m-auto">
                <div className="col-md-6 d-flex flex-column">
                    <p>Total expenses</p>
                    <p>Total incomes</p>
                    <p>Balance</p>
                </div>
                <div className="col-md-6 d-flex flex-column">
                   
                    <p>{totalCount(expenses)}&euro;</p>
                    <p>{totalCount(incomes)}&euro;</p>
                    <p>{totalCount(incomes)-totalCount(expenses)}&euro;</p>
                </div>
            </div>
        </div>

    )
}

export default connect((state) => ({
    expenses: state.expenses,
    incomes: state.incomes
}))(AccountInfo)
