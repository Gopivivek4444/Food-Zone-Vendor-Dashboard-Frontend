import React from 'react'

const NavBar = ({showLoginHandler, showRegisterHandler, showLogOut, logOutHandler}) => {
  return (
    <div className="navSection">
       <div className="company">
            Vendor Dashboard
       </div> 
       <div className="userAuth">
        {showLogOut?<span onClick={logOutHandler}>Logout</span>:
        <>
        <span onClick={showLoginHandler}>Login /</span>
        <span onClick={showRegisterHandler}>Register</span>
        </>}
       </div>
    </div>
  )
}

export default NavBar