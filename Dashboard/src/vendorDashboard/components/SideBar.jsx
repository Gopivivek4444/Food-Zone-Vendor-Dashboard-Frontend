import React from 'react'

const SideBar = ({showAddFirmHandler, showAddProductHandler,showVendorFirmHandler,showAllProductsHandler}) => {
  return (
    <div className="sideBarSection">
        <ul>
            <li onClick={showAddFirmHandler}>Add Firm</li>
            <li onClick={showAddProductHandler}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
            <li onClick={showVendorFirmHandler}>All Firms</li>
        </ul>
    </div>
  )
}

export default SideBar