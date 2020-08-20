import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import Expenses from './Expense'
import Dashboard from './Dashboard'
import Summary from './Summary'
import NotFound from './404'
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Income from './Income'

/* make sure history version compatible with react-router-dom version. Here useing 
history v4 and react-router-dom v5 */
export const history = createBrowserHistory()





const AppRouter = () => {


    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch>

                        <Route path='/' component={Home} exact={true} />
                        <PublicRoute path='/login' component={LogIn} />
                        <Route path='/signup' component={SignUp} />
                        <PrivateRoute path='/dashboard' component={Dashboard} />
                        <PrivateRoute path="/expenses" component={Expenses} />
                        <PrivateRoute path="/incomes" component={Income} />
                        <PrivateRoute path="/dashboard" component={Dashboard}/>
                        <PrivateRoute path="/summary" component={Summary} />
                        <PrivateRoute component={NotFound} />
                    </Switch>
                </div>

            </Router>
        </div>
    )
}
export default AppRouter;