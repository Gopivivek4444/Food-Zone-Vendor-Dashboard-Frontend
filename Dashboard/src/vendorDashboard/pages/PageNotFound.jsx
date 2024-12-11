import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (

    <div style={{color:'red', display:'flex', alignItems:'center', justifyContent:'center',  height:'100vh'}}>
        <div>
        <h1>PAGE NOT FOUND 404</h1>
        <h1>OR ROUTE NOT EXIST</h1>
        <Link to="/"><h4 style={{textAlign:'center', color:'blue'}}>Go Back</h4></Link>
        </div>
    </div>
  )
}

export default PageNotFound