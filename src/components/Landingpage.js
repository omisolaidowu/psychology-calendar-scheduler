import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
  const [token, setToken] = useState('');
  const [first_name, setFirst_Name] = useState('')

  useEffect(() => {
    const storedToken = sessionStorage.getItem('access_token');
    const user_name = sessionStorage.getItem('first_name')
    setToken(storedToken);
    setFirst_Name(user_name)
  }, []);

  if (!token) {
    return (
        
      <div className="landing-container">
        <h1 className='home-title'>Psyche Mega Therapy</h1>
        <div className="buttons-container">
          <NavLink to="/login-page" className="button login-button">
            Login
          </NavLink>
          <NavLink to="/#" className="button register-button">
            Sign up
          </NavLink>
        </div>
      </div>
    );
  } else {
    return (
    <div>
        <h1 className='login-title'>Psyche Mega Therapy</h1>
        <div className="landing-dropdown">
            
            <button className="landing-dropbtn fa fa-caret-down">{first_name}</button>
            <div className="landing-dropdown-content">
                <NavLink to="/book-a-meeting">Book a Meeting</NavLink>
                <NavLink to="#">Service Quotes</NavLink>
                <NavLink to="/logout" className="button login-button">Logout</NavLink>
            </div>
            
        </div>
    </div>
    );
  }
};

export default LandingPage;
