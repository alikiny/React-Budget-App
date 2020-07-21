import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <div className='header'>
        <h1 className="app-name">Budget Management</h1>
        <div className="nav-bar">
            <NavLink to='/' activeClassName="link-active" exact={true}>Home</NavLink>
            <NavLink to='/expenses' activeClassName="link-active">Expenses</NavLink>
            <NavLink to='/incomes' activeClassName="link-active">Incomes</NavLink>
            <NavLink to={'/transactions'} activeClassName="link-active">Transactions</NavLink>
            <NavLink to={'/guides'} activeClassName="link-active">Guides</NavLink>
        </div>
    </div>
)

export default Header