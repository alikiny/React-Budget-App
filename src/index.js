import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

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


ReactDOM.render(jsx, document.getElementById('budget-app'))



