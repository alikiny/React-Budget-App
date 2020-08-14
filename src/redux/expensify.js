import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
const thunk = require('redux-thunk').default


import{expensesReducer}from './expenses'
import{filterReducer}from './filters'
import authReducer from './auth'



const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose

export default ()=>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}
    


