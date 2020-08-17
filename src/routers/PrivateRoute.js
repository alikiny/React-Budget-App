import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from './Header'


export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {

    console.log(isAuthenticated)
    return(
        <Route {...rest} component={props => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
                <Redirect to='/'/>
            )
    )} />
)}

const mapStateToProp = (state) => ({
    isAuthenticated: !!state.auth.uid
    /* !! convert the value to a boolean value */
})

export default connect(mapStateToProp)(PrivateRoute)