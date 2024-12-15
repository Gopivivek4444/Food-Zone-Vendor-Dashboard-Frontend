import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/welcome'
import VendorFirms from '../components/VendorFirms'
import AllProducts from '../components/AllProducts'
const LandingPage = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showAddFirm, setShowAddFirm] = useState(false)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showWelcome, setWelcome] = useState(false)
    const [showVendorFirms, setVendorFirms] = useState(false)
    const [showAllProducts, setAllProducts] = useState(false)
    const [showLogOut, setLogOut] = useState(false)

    const LoginToken = localStorage.getItem('loginToken')

    useEffect(() =>{
      const loginToken = localStorage.getItem('loginToken')
      if(loginToken){
        setLogOut(true)
      }
    })

    const logOutHandler = () =>{

      localStorage.removeItem('loginToken')
      localStorage.removeItem('firmId')
      localStorage.removeItem('firmName')
      setLogOut(false)
      showLoginHandler()

    }

    const showLoginHandler = () =>{
      setShowLogin(true);
      setShowRegister(false)
      setShowAddFirm(false)
      setShowAddProduct(false)
      setWelcome(false)
      setVendorFirms(false)
      setAllProducts(false)
    }

    const showRegisterHandler = () =>{
        setShowRegister(true);
        setShowLogin(false)
        setShowAddFirm(false)
        setShowAddProduct(false)
        setWelcome(false)
        setVendorFirms(false)
        setAllProducts(false)
    }

    const showAddFirmHandler = () =>{
      setShowAddFirm(true)
      setShowRegister(false);
      setShowLogin(false)
      setShowAddProduct(false)
      setWelcome(false)
      setVendorFirms(false)
      setAllProducts(false)
    }

    const showAddProductHandler = () =>{
      setShowAddProduct(true)
      setShowRegister(false);
      setShowLogin(false)
      setShowAddFirm(false)
      setWelcome(false)
      setVendorFirms(false)
      setAllProducts(false)
    }

    const showWelcomeHandler = () =>{
      setShowAddProduct(false)
      setShowRegister(false);
      setShowLogin(false)
      setShowAddFirm(false)
      setWelcome(true)
      setVendorFirms(false)
      setAllProducts(false)
    }

    const showVendorFirmHandler = () =>{
      setVendorFirms(true);
      setShowAddProduct(false)
      setShowRegister(false);
      setShowLogin(false)
      setShowAddFirm(false)
      setWelcome(false)
      setAllProducts(false)
    }

    const showAllProductsHandler = () =>{
      setAllProducts(true)
      setVendorFirms(false)
      setShowAddProduct(false)
      setShowRegister(false);
      setShowLogin(false)
      setShowAddFirm(false)
      setWelcome(false)

    }

  return (
    <>
        <section className='landingSection'>
            <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogOut = {showLogOut} logOutHandler = {logOutHandler}/>
          <div className="collectionSection">
            {LoginToken && <SideBar showAddFirmHandler = {showAddFirmHandler} showAddProductHandler = {showAddProductHandler} showVendorFirmHandler = {showVendorFirmHandler} showAllProductsHandler = {showAllProductsHandler}/>}
            {showLogin && <Login showWelcomeHandler = {showWelcomeHandler}/>}  {/* {showLogin? <Login/> : ""} */}
            {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
            {showAddFirm && <AddFirm/>}
            {showAddProduct && <AddProduct/>}
            {showWelcome && <Welcome/>}
            {showVendorFirms && <VendorFirms showAddProductHandler={showAddProductHandler}/>}
            {showAllProducts && <AllProducts/>}
          </div>
            
        </section>
    </>
  )
}

export default LandingPage