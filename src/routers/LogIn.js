import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { loginAction,loginCustom } from '../firebase/loginAction'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';

export const LogIn = ({ loginAction,loginCustom}) => {

    const [userEmail,setUserEmail]=useState("")
    const [userPassword,setUserPassword]=useState("")

    const signInWithAccount=(e)=>{
        e.preventDefault()
        loginCustom(userEmail,userPassword)
    }

    return(
    <form className="form">

        <TextField
            label="User email"
            id='user-email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            variant="outlined"
        >
        </TextField>

        <TextField
            label="Password"
            id='password'
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            variant="outlined">
        </TextField>

        <button 
        className="btn btn-success" 
        type="submit" 
        id="submit-btn"
        onClick={signInWithAccount}
        > Log In </button>
        &nbsp;
        <p>Log in with Google</p>
        <img onClick={loginAction} 
        id="google-login" 
        src="images/gg.png" 
        width="40"></img>
        <p>Do not have an account? 
        <NavLink to="/signup"> Sign up here</NavLink></p>
        <NavLink to="/home"><HomeIcon style={{ fontSize: 40, margin:'auto', color:'black'}}/></NavLink>
        
    </form>

)}

const mapDispatchToProp = dispatch => ({
    loginAction: () => dispatch(loginAction()),
    loginCustom: (email,password)=>dispatch(loginCustom(email,password))
})

export default connect(undefined, mapDispatchToProp)(LogIn)