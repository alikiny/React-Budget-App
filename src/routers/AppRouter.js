import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './Home'
import Expenses from './Expense'
import Incomes from './Income'
import Transactions from './Transaction'
import Guides from './Guide'
import NotFound from './404'
import Header from './Header'

const incomes = '/incomes'
const transactions = '/transactions'
const guides = '/guides'
const expenses = '/expenses'






const AppRouter = () => (
    <div>
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path='/' component={Home} exact={true} />
                    <Route path={expenses} component={Expenses} exact={true} />
                    <Route path={incomes} component={Incomes} exact={true} />
                    <Route path={transactions} component={Transactions} exact={true} />
                    <Route path={guides} component={Guides} exact={true} />
                    <Route component={NotFound} />
                </Switch>
            </div>

        </BrowserRouter>
    </div>
)
export default AppRouter;