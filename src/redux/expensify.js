import { createStore, combineReducers, applyMiddleware,compose } from 'redux'

import{expensesReducer}from './expenses'
import{filterReducer}from './filters'

const thunk = require('redux-thunk').default

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose

export default ()=>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}
    


