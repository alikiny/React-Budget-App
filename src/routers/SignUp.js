import React from 'react';
import TextField from '@material-ui/core/TextField';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom'

const SignUp = ({signUpAction}) => (
    <form className="form">
        <TextField
            label="Email"
            id='email'
            value=''
            onChange={() => console.log()}
            variant="outlined"
        >
        </TextField>


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
            variant="outlined"
        >
        </TextField>


        <TextField
            label="Retype-password"
            id='password'
            value=''
            onChange={() => console.log()}
            variant="outlined"
        >
        </TextField>

        <button className="btn btn-success" type="submit" onClick={signUpAction}> Register </button>

        &nbsp;
        <p>Already have an account? 
        <NavLink to="/login"> Log in</NavLink></p>
        <NavLink to="/home"><HomeIcon style={{ fontSize: 40, margin:'auto', color:'black'}}/></NavLink>
    </form>

)


export default SignUp