import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {setExpensesAction} from './redux/expenses'

// main app
import App from '../containers/app';
import newStore from './redux/expensify'
import './firebase/firebase'


const store = newStore()
const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

store.dispatch(setExpensesAction()).then(()=>{
    ReactDOM.render(jsx, document.getElementById('budget-app'))
})









