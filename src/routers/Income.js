import React from 'react'
import { connect } from 'react-redux'
import IncomeList from './IncomeList'
import IncomeForm from './IncomeForm'

export const Income = ({ incomes }) => {
    return (
        <div className="container">
            <IncomeForm/>
            <IncomeList incomes={incomes}/>
        </div>
    )
}

export default connect(state => ({
    incomes: state.incomes
}))(Income)

