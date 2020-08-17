import React from 'react';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import {loginAction} from '../firebase/loginAction'

export const LogIn = ({loginAction}) => (
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

        <button type="submit" id="submit-btn"> Log In </button>
        <button type="button" onClick={loginAction} id="google-login">Log in with Google</button>
        <p>Do not have an account? 
        <a>Sign up here</a></p>

    </form>

)

const mapDispatchToProp= dispatch =>({
    loginAction: ()=> dispatch(loginAction())
})

export default connect(undefined,mapDispatchToProp)(LogIn)