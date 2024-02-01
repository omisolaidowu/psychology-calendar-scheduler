import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

const LandingPage = () => {

    return (
    <div>
        <h1 className='login-title'>Psyche Mega Therapy</h1>
        <div className="landing-dropdown">
            <div className="landing-dropdown-content">
                <NavLink to="/book-a-meeting">Book a Meeting</NavLink>
                <NavLink to="#">Service Quotes</NavLink>
                <NavLink to="/logout" className="button login-button">Logout</NavLink>
            </div>

        </div>
    </div>
    )
  }
export default LandingPage;
