import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setExpensesAction } from './redux/expenses'
import LoadingPage from './routers/LoadingPage'
import {setAccountAction} from './redux/saving'
import {setIcomesAction} from './redux/income'

// main app
import App from '../containers/app';
import newStore from './redux/expensify'
import { firebase } from './firebase/firebase'
import { history } from './routers/AppRouter'
import { login, logout } from './redux/auth'

const store = newStore()
const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)


let hasRendered = false

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('budget-app'))
        hasRendered = true
    }
}

const checkPath=/^\/login|\/signup$/g

ReactDOM.render(<LoadingPage/>, document.getElementById('budget-app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid)
        store.dispatch(login(user.uid))
        store.dispatch(setAccountAction())
        .then(()=>store.dispatch(setExpensesAction()))
        .then(()=>store.dispatch(setIcomesAction()))
        .then(() => {
            renderApp()
            if (history.location.pathname === '/login') {
                history.push('/dashboard')
            }
        })
    } else {
        store.dispatch(logout())
        renderApp()
        if(!checkPath.test(history.location.pathname)){
            console.log(history.location.pathname.match(checkPath))
            history.push('/')
        }

        
    }

})










