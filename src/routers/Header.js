import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutAction } from '../firebase/logOutAction'

export const Header = ({ logoutAction }) => (
    <div className='header'>
        <h1>
            <NavLink to='/' className='nav-link app-name' activeClassName="link-active" exact={true}>MoneyMe</NavLink>
        </h1>



        <button type="button" className='log-out-btn' onClick={logoutAction}>Log out</button>

        <div className="navbar navbar-text navbar-expand-lg">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to='/' className='nav-link' activeClassName="link-active" exact={true}>Home</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to='dashboard' className='nav-link' activeClassName="link-active">Dashboard</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to='expenses' className='nav-link' activeClassName="link-active">Expenses</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to='summary' className='nav-link' activeClassName="link-active">Summary</NavLink>
                </li>

            </ul>
        </div>
    </div>
)


const mapDispatchToProp = (dispatch) => ({
    logoutAction: () => dispatch(logoutAction())
})
export default connect(undefined, mapDispatchToProp)(Header)