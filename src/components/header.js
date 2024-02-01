import React, { useState, useCallback }  from 'react';
import { useHistory, NavLink } from 'react-router-dom';

function HeaderPage()
{
     const toggleNavigation = useState(false)

     const useToggleNavigation = useCallback( () => {
          let toggle = document.querySelector('.sideBarContainer')
          toggle.classList.toggle('openSideBar')
          // console.log(toggleNavigation[0], toggle)
     })

     return (
          <div className="header-page-component">
               <nav className="headerNavigation">
                    <h3><NavLink to="/" className="anchorTag">MegaPsycheTherapy</NavLink></h3>
                    <ul className="navigationLinksUL">
                         <li><NavLink to="/contact" className="anchorTag">Contact</NavLink></li>
                         <li><NavLink to="/about" className="anchorTag">About us</NavLink></li>
                    </ul>
               </nav>
               <div className="navigationToggle" onClick={useToggleNavigation}>
                    <div className="navigationIconContainer">
                         <span className="navigationIcon">&#x21c7;</span>
                    </div>
               </div>
               <div className="sideBarContainer ">
                    <ul className="navigationLinksUL">
                         <li><NavLink to="/" className="anchorTag">Home</NavLink></li>
                         <li><NavLink to="/contact" className="anchorTag">Contact</NavLink></li>
                         <li><NavLink to="/about" className="anchorTag">About us</NavLink></li>
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

export default HeaderPage;
