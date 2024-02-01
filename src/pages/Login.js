import React, { useRef, useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import HeaderPage from './../components/header';
import Spinner from './../components/spinner';
import {loadUserTherapySessionInformation} from './../fetch-data/my-api';

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')

  const redirect = useHistory();
  const headerNavigation = HeaderPage();
  // const spinner = Spinner();
  const [isLoaded, setisLoaded] = useState(true)

  const [loading, updateLoadingStatus] = useState(false)

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

useEffect( () => {
     if(email.length > 12 && password.length > 4)
     {
          let button = document.querySelector('.login-submit-button')
          button.removeAttribute('disabled')
     }
}, [email, password])

  const handleLogin = e => {
    setisLoaded(false)
    updateLoadingStatus(true)
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
            updateLoadingStatus(false)
            setresStatus(result.status)
            setuserToken(result.access_token)
            setMessage(result.message)
            if (result.status===0){
               setisLoaded(true)
               setMessage(result.message)
               setresStatus(result.status)
          }else{
               let retrieveData = loadUserTherapySessionInformation(emailRef.current.value, result.access_token).then(
                    (data) => {
                         sessionStorage.setItem("access_token", result.access_token)
                         sessionStorage.setItem("role", result.role)
                         sessionStorage.setItem("first_name", result.first_name)
                         sessionStorage.setItem("appointment_history", JSON.stringify(data))
                         redirect.push("/user/dashboard")
                    }
               )
          }

        return result
      })

      .catch(error => console.log("error", error))

  };

  // console.log(isLoaded)

  return (
    <div className="content-wrapper">
    {loading && <Spinner data={loading}/>}
    {headerNavigation}
      <div className="login-wrapper">
        <h1 className='title'>Welcome!</h1>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin}>
        {  resstatus !==1 ? <p className="errorMessage">{Message}</p>   : <p className="errorMessage">{Message}</p>  }
          <div className="form-group">
            <input placeholder="opeyemi@gmail.com" required type="email" id="username" ref={emailRef} onChange={ (e) => changeEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <input required type="password" id="password" ref={passwordRef} placeholder="****" onChange={ (e) => changePassword(e.target.value)}/>
          </div>
          <div className="button-container">
              <button className='solid-button login-submit-button' disabled type="submit">Login</button>
          </div>
          <p className="center-paragraph"> Forgot password? </p>

          <div className="flex-center">
               <div className="border"></div>
               <span>Or</span>
               <div className="border"></div>
          </div>
          <p className="center-paragraph"><NavLink to="/register" className="anchorTag">Create an account</NavLink></p>
        </form>
      </div>
      <div className="sideContainerForLogin"></div>
    </div>
  );
};

export default LoginPage;
