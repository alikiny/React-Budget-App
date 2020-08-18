import React from 'react';
import { NavLink } from 'react-router-dom'


const Home = () => {
    return (
        <div className="home-page">
            <div className="text-box">
                <NavLink to="/login">Log In</NavLink>
                <p></p>
                <p>OR</p>
                <NavLink to="/signup">Create new account</NavLink>
            </div>

        </div>
    )
}

export default Home