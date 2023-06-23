import React, { useRef, useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const redirect = useHistory();
  const [isLoaded, setisLoaded] = useState(true)
  const [resstatus, setresStatus] = useState('')

  const [userToken, setuserToken] = useState("")

  const [isnoError, setisnoError] = useState(true)
  const [Message, setMessage] = useState('')

  useEffect(() => {
    return () => {
    setisLoaded(true)
    // setisnoError(true)
    };
  }, []);


  const handleLogin = e => {
    setisLoaded(false)
    const controller = new AbortController();
    e.preventDefault();
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  
    var requestOptions = {
      method: "POST",
      signal: controller.signal,
      headers: myHeaders,
      body: raw,
    };
  
     fetch("https://megapsyche-omisolaidowu.b4a.run/api/login", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json();
        }
      })
      .then(result => {
            setisLoaded(false)
            setresStatus(result.status)
            setuserToken(result.access_token)
            setMessage(result.message)
            if (result.status===0){
              setisLoaded(true)
              setMessage(result.message)
              setresStatus(result.status)
              
          }else{
            sessionStorage.setItem("access_token", result.access_token)
            sessionStorage.setItem("role", result.role)
            sessionStorage.setItem("first_name", result.first_name)
            redirect.goBack()
          }
            
        return result
      })

      .catch(error => console.log("error", error))

  };  

  console.log(isLoaded)

  return (
    <div className="modal-container">
      <div className="modal-content">
      <NavLink to="/" className="home-nav">
        <h1 className='form-text'>Psyche Mega Therapy</h1>
    </NavLink>
        
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input required type="email" id="username" ref={emailRef} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input required type="password" id="password" ref={passwordRef} />
          </div>
          <div className="form-group">
            {!isLoaded?
              <button className='disabled' disabled type="submit">Login</button>:
              <button type="submit">Login</button>
              }
          </div>
          <div className="signup-link">
            No account? <NavLink to="#">Sign up</NavLink>
          </div>
        </form>
        {!isLoaded && <div className="spin"></div>}
        
        {resstatus !==1 ?
        <>{Message}</>
        :<>{Message}</>
        }        
      </div>
      
    </div>
  );
};

export default LoginPage;
