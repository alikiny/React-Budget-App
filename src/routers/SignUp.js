import React from 'react';
import TextField from '@material-ui/core/TextField';



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

        <button type="submit" onClick={signUpAction}> Register </button>

        <p>Already have an account? 
        <a >Log in</a></p>

    </form>

)


export default SignUp