import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setExpensesAction } from './redux/expenses'

// main app
import App from '../containers/app';
import newStore from './redux/expensify'
import { firebase } from './firebase/firebase'
import { history } from './routers/AppRouter'
import {homeHistory} from './routers/Home'
import Home from './routers/Home'
import {login,logout} from './redux/auth'

const store = newStore()
const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

const openPage = (
    <Provider store={store}>
        <Home />
    </Provider>
)

let hasRendered = false

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('budget-app'))
        hasRendered = true
    }
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(setExpensesAction()).then(() => {
            
            ReactDOM.render(jsx, document.getElementById('budget-app'))
            if(homeHistory.location.pathname==='/login'){
                history.push('/')
            }
        })
    } else {
        ReactDOM.render(openPage, document.getElementById('budget-app'))
        if(history.location.pathname!=='/'){
            homeHistory.push('/')
        }
    }
})










