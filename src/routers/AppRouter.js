import React from 'react';
import {Route, Switch,Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute'

import Expenses from './Expense'
import Dashboard from './Dashboard'
import Summary from './Summary'
import NotFound from './404'
import Header from './Header'


/* make sure history version compatible with react-router-dom version. Here useing 
history v4 and react-router-dom v5 */
export const history=createBrowserHistory()





const AppRouter = () => {

    
    return(
        <div>
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <PrivateRoute path='/' component={Dashboard} exact={true} />
                    <PrivateRoute path="/expenses" component={Expenses} exact={true} />
                    <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
                    <PrivateRoute path="/summary" component={Summary} exact={true} />
                    <PrivateRoute component={NotFound} />
                </Switch>
            </div>

        </Router>
    </div>
)}
export default AppRouter;