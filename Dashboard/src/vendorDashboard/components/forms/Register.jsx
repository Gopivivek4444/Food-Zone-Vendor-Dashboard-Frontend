import React, { useState } from 'react'
import "../../styles/register.css";
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[error, setError] = useState("")
  const[loading, setLoading] = useState(true)

  const handleOnSubmit = async(e) =>{
      e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/vendor/register`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({username,email,password})
        })
        const data = await response.json();
        if(response.ok){
          console.log(data);
          setUsername("");
          setEmail("");
          setPassword("");
          alert("Vendor Registered Successfully")
          showLoginHandler();
        }
      } catch (error) {
        console.error("Registration Failed")
        alert("Registration Failed")
      }
  }

  return (
    <div className="Register-section">
      <h3>Vendor Register</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value = {username} placeholder="Enter your Username" onChange={(e) =>{setUsername(e.target.value)}}className="form-input" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={email} placeholder="Enter your Email" onChange={(e) =>{setEmail(e.target.value)}} className="form-input" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value = {password} placeholder="Enter Your Password" onChange={(e) =>{setPassword(e.target.value)}} className="form-input" />
        </div>
        <div className="btn-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register

