import React from 'react';
import {Router, BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import LogIn from './LogIn'
import SignUp from './SignUp'
import NotFound from './404'
import {OpenPage} from './OpenPage'

export const homeHistory=createBrowserHistory()

const Home = () => {


    return (

        <div>
            <Router history={homeHistory}>
                <div>
                    <Switch>
                        <Route path="/" component={OpenPage} exact/>
                        <Route path='/login' component={LogIn}></Route>
                        <Route path='/signup' component={SignUp}></Route>
                        <Route component={NotFound} />
                    </Switch>

                    
                </div>
            </Router>


        </div>

    )
}
export default Home