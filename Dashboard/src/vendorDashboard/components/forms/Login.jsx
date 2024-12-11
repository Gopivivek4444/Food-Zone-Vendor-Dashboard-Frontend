import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';


const Login = ({showWelcomeHandler}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
      })
      const data = await response.json();
      if(response.ok)
      {
        alert("Login Successfull")
        localStorage.setItem('loginToken', data.token)
      //   const Token = data.token;
      //   // Manually decode the JWT payload to extract vendorId
      //   const base64Url = Token.split('.')[1];
      //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      //   const jsonPayload = decodeURIComponent(
      //     atob(base64)
      //     .split('')
      //     .map((c) => {
      //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      //     })
      //     .join('')
      // );

      // const { vendorId } = JSON.parse(jsonPayload);
      // console.log(vendorId); // This will give you the vendorId

        setEmail("");
        setPassword("");
        showWelcomeHandler();
      }
      else{
        alert("Login Failed");
      }
    } catch (error) {
      // console.error(error);
      alert("Login Failed due to server error");
    }
  }

  return (
    <div className="login-section">
      <h3>Vendor Login</h3>
      <form onSubmit={loginHandler}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" placeholder="Enter your Email"  value={email} onChange={(e) =>{setEmail(e.target.value)}} className="form-input" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter Your Password"   value={password} onChange={(e) =>{setPassword(e.target.value)}} className="form-input" />
        </div>
        <div className="btn-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
