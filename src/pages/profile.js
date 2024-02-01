import React, {useEffect, useState} from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import avater from './../public/avater.jpg';

function ProfilePage()
{
     const [user, setUser] = useState(null)
     useEffect( () => {
          setUser(sessionStorage.getItem('user'))
     }, [])
     return (
          <div className="user-profile-page">
               <header>
                    <NavLink to="/user/dashboard" className="anchorTag">&#x2190;</NavLink>
                    <div>
                         <h1>Omisola's status</h1>
                    </div>
               </header>
               <section className="user-dashboard-container">
                    <div className="user-profile-image-wrapper">
                         <img title="User avater" alt="user's avater" src={avater} className="profile-page-profile-picture"/>
                    </div>
                    <p className="profile-text">{user.first_name}</p>
                    <p className="profile-text">{user.last_name}</p>
                    <p className="profile-text">{user.email}</p>
               </section>
          </div>
     );
}

export default ProfilePage;
