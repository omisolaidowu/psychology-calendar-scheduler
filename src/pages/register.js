import React, { useRef, useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import HeaderPage from './../components/header';
import Spinner from './../components/spinner';

function RegisterPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const redirect = useHistory();
  const headerNavigation = HeaderPage();
  const [resstatus, setresStatus] = useState('')

  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [first_name, changeFirstName] = useState('')
  const [last_name, changeLastName] = useState('')
  const [loading, updateLoadingStatus] = useState(false)

  const [isnoError, setisnoError] = useState(true)
  const [Message, setMessage] = useState('')

  const first_name_ref = useRef();
  const last_name_ref = useRef();

  useEffect( () => {
       if(email.length > 12 && password.length > 4 && first_name.length > 3 && last_name.length > 3)
       {
            let button = document.querySelector('.login-submit-button')
            button.removeAttribute('disabled')
       }
  }, [email, password])


  const handleLogin = e => {
    const controller = new AbortController();
    e.preventDefault();
    updateLoadingStatus(true)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: emailRef.current.value,
      Password: password,
      first_name: first_name,
      last_name: last_name
    });

    var requestOptions = {
      method: "POST",
      signal: controller.signal,
      headers: myHeaders,
      body: raw,
    };

     fetch("https://megapsyche-omisolaidowu.b4a.run/api/register", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json();
        }
      })
      .then(result => {
           updateLoadingStatus(false)
            setresStatus(result.status)
            setMessage(result.message)
            if ( result.status === 0 ){
              setMessage(result.message)
              setresStatus(result.status)
            }else{
                 // sessionStorage.setItem("access_token", result.access_token)
                 // sessionStorage.setItem("role", result.role)
                 redirect.push("/")
            }

        // return result
      })

      .catch(error => console.log("error", error))

  };

  return (
    <div className="content-wrapper">
    {loading && <Spinner data={loading}/>}
    {headerNavigation}
      <div className="login-wrapper">
        <h1 className='title'>Hello !</h1>
        <p className="subtitle">Create a new account</p>

        <form onSubmit={handleLogin}>
        {  resstatus !==1 ? <p className="errorMessage">{Message}</p>   : <p className="errorMessage">{Message}</p>  }
             <div className="form-group">
               <input placeholder="First Name" required type="text" id="name" onChange={ (e) => changeFirstName(e.target.value)}/>
             </div>
             <div className="form-group">
               <input placeholder="Last Name" required type="text" id="name" onChange={ (e) => changeLastName(e.target.value)}/>
             </div>
          <div className="form-group">
            <input placeholder="Email" required type="email" id="email" ref={emailRef} onChange={ (e) => changeEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input required type="password" id="password" ref={passwordRef} placeholder="Password" onChange={ (e) => changePassword(e.target.value)}/>
          </div>
          <div className="button-container">
              <button className='solid-button login-submit-button' disabled type="submit">Create account</button>
          </div>
          <div className="flex-center">
               <div className="border"></div>
               <span>Or</span>
               <div className="border"></div>
          </div>
          <p className="center-paragraph"><NavLink to="/login" className="anchorTag">Sign into your account</NavLink></p>
        </form>
      </div>

    </div>
  );
};

export default RegisterPage;
