import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { loginAction } from '../firebase/loginAction'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';

export const LogIn = ({ loginAction }) => (
    <form className="form">

        <TextField
            label="User name"
            id='user-name'
            value=''
            onChange={() => console.log()}
            variant="outlined"
        >
        </TextField>

        <TextField
            label="Password"
            id='password'
            value=''
            onChange={() => console.log()}
            variant="outlined">
        </TextField>

        <button className="btn btn-success" type="submit" id="submit-btn"> Log In </button>
        &nbsp;
        <p>Log in with Google</p>
        <img onClick={loginAction} id="google-login" src="images/gg.png" width="40"></img>
        <p>Do not have an account? 
        <NavLink to="/signup"> Sign up here</NavLink></p>
        <NavLink to="/home"><HomeIcon style={{ fontSize: 40, margin:'auto', color:'black'}}/></NavLink>
        
    </form>

)

const mapDispatchToProp = dispatch => ({
    loginAction: () => dispatch(loginAction())
})

export default connect(undefined, mapDispatchToProp)(LogIn)