import React from 'react';
import { NavLink } from 'react-router-dom'


const Home = () => {
    return (
        <div>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Create new account</NavLink>
        </div>
    )
}

export default Home