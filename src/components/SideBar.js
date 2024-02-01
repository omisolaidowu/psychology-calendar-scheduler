import React, {useCallback, useState} from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import avater from './../public/avater.jpg';

function SideBar()
{
     const toggleNavigation = useState(false)

     const useToggleNavigation = useCallback( () => {
          let toggle = document.querySelector('.sideBarContainer')
          toggle.classList.toggle('openSideBar')
     })

     return (
          <div>
               <nav className="">
                    <div className="navigationToggle" onClick={useToggleNavigation}>
                         <div className="navigationIconContainer">
                              <span className="navigationIcon">&#x21c7;</span>
                         </div>
                    </div>
               </nav>
               <div className="sideBarContainer">
                    <div className="flex-center">
                         <img className="profile-image" alt='profile img' src={avater} />
                    </div>
                    <ul className="navigationLinksUL">
                         <li><NavLink to="/user/dashboard" className="anchorTag">Home</NavLink></li>
                         <li><NavLink to="/user/profile" className="anchorTag">Profile</NavLink></li>
                         <li><NavLink to="/user/book-appointment" className="anchorTag">Book an appointment</NavLink></li>
                         <li><NavLink to="/user/my-appointments" className="anchorTag">All appointments</NavLink></li>
                         <li><NavLink to="/user/faq" className="anchorTag">Frequently Asked Questions</NavLink></li>
                         <li><NavLink to="/logout" className="anchorTag">Logout</NavLink></li>
                    </ul>
                    <div className="navigationToggleLeft " onClick={useToggleNavigation}>
                         <div className="navigationIconContainer">
                              <span className="navigationIcon">&#x21c9;</span>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default SideBar;
