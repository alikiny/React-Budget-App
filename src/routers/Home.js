import React from 'react';
import totalExpense from '../redux/total-expense'
import { connect } from 'react-redux';



export const Home = (props) => (
    <div className="container">
        <div className='row'>

            <div className="col-sm-4 bg-light">
                This is my component Home
            </div>

            <div className="col-sm-1"></div>

            <div className="col-sm-7 bg-success">
                <p>Total expenses: {props.expenses.length} </p>
                <p>Sum of expenses:  {totalExpense(props.expenses)}&euro;</p>
            </div>

        </div>
    </div>

)


export default connect(state => ({
    expenses: state.expenses
}))(Home)