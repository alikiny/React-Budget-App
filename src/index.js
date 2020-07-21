import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// main app
import App from '../containers/app';
import newStore from './redux/expensify'
import { addExpense} from './redux/expenses'


const store = newStore()

const e1 = store.dispatch(addExpense({
    description: 'Rent',
    note: 'House rent',
    amount: 550,
    createdAt: 4
}))

const e2 = store.dispatch(addExpense({
    description: 'Monthly Rent',
    note: 'Car rent',
    amount: 50,
    createdAt: 5
}))

const e3 = store.dispatch(addExpense({
    description: 'Bill',
    note: 'Electric bill',
    amount: 60,
    createdAt: 2
}))


const e5 = store.dispatch(addExpense({
    description: 'Phone bill',
    note: 'Phone bill',
    amount: 20,
    createdAt: 0
}))

const e4 = store.dispatch(addExpense({
    description: 'Water bill',
    note: 'Water bill',
    amount: 10,
    createdAt: 1
}))


const state = store.getState()

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>

)


ReactDOM.render(jsx, document.getElementById('budget-app'))



