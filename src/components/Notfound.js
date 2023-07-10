import { NavLink } from 'react-router-dom'
import {useState, useEffect} from "react"
import user_info from "../fetch-data/user.info";


const Navigation = () =>{

    const [token, setToken] = useState('');
    const [userInfo, setuserInfo] = useState([])

    useEffect(()=>{

        const abortController = new AbortController()
    
    
          const storedToken = sessionStorage.getItem('access_token');
          
          setToken(storedToken);
          user_info(storedToken, (data) => {
            setuserInfo(JSON.parse(data));
          });
  
        return () => {
          abortController.abort()
        }
          
          
      }, [])
  

    return(
        <div>
            
            <div>{!token? 
          <div className="landing-container">
            <div className="buttons-container">
              <NavLink to="/" className="button login-button">
                Login
              </NavLink>
              <NavLink to="/#" className="button register-button">
                Register
              </NavLink>
            </div>
          </div>:
      
        <div className="dropdown">
            <button className="dropbtn fa fa-caret-down">{userInfo.first_name}</button>
                <div className="dropdown-content">
                    <NavLink to="/book-a-meeting">Book a Meeting</NavLink>
                    <NavLink to="/">Service Quotes</NavLink>
                    <NavLink to="/logout" className="button login-button">Logout</NavLink>
                </div>
                
        </div>
        }
        </div>

            <h1 className = 'exist'>Error 404: Ooops! That page doesn't exist</h1>
        </div>
    )
    
    

}

export default Navigation;
