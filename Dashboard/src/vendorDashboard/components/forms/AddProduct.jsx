import React, { useState } from 'react'

import { API_URL } from '../../data/apiPath';


const AddProduct = () => {
   
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const firmName = localStorage.getItem('firmName');

    const handleCategoryChange = (event)=>{
      const value = event.target.value;
      if (category.includes(value) ) {
            setCategory(category.filter((item) => item!== value))
       } else {
            setCategory( [ ...category, value])
       }
    }

    const handleBestSeller = (e) =>{
      const Value = e.target.value === 'true'
      setBestSeller(Value);
    }

    const handleImageUpload = (event) =>{
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    }

    const handleAddProduct = async(e) =>{
      e.preventDefault();
      try {
        const loginToken = localStorage.getItem('loginToken');
        const firmId = localStorage.getItem('firmId');

        if(!loginToken || !firmId){
          console.error("User Not Authenticated");
        }

        const formData = new FormData();
        formData.append('productName',productName);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('image',image)
        formData.append('bestSeller',bestSeller)

        category.forEach((value) =>{
              formData.append('category',value);
        });

        const response = await fetch(`${API_URL}/product/addProduct/${firmId}`,{
          method: 'POST',
          body: formData
        })
        const data = await response.json();
        
        if(response.ok){
          console.log(data.message);
          alert("Product Added Successfully");
          setProductName("")
          setPrice("")
          setCategory([])
          setBestSeller(false)
          setDescription("")
          setImage(null)

        }

      } catch (error) {
        console.error(error)
        alert("Failed To Add Product");
      }
    }

  return (
    <div className="firmSection">
      {firmName?
      <div className='productContainer'>
        <h1>Add Product To {firmName}</h1>
        <form className='tableForm' onSubmit={handleAddProduct}>
            <label>Product Name</label>
            <input type='text' value={productName} onChange={(e) =>{setProductName(e.target.value)}}/>
            <label>Price</label>
            <input type='text' value={price} onChange={(e) =>{setPrice(e.target.value)}}/>
            <label>Category</label>
            <div className="checkInp">
              <div className="checkboxContainer">
                    <label>Veg</label>
                    <input className="checkBoxInp" type='checkbox' checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
              </div>
              <div className="checkboxContainer">
                    <label>Non-Veg</label>
                    <input className="checkBoxInp" type='checkbox' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
              </div>
            </div>
            <label>Bestseller</label>
            <div className="checkInp">
              <div className="checkboxContainer">
                    <label>Yes</label>
                    <input className="checkBoxInp" type='radio' value="true" checked = {bestSeller === true} onChange={handleBestSeller}/>
              </div>
              <div className="checkboxContainer">
                    <label>No</label>
                    <input className="checkBoxInp" type='radio' value="false" checked = {bestSeller === false} onChange={handleBestSeller}/>
              </div>
            </div>
            <label>Description</label>
            <input type='text' value={description} onChange={(e) =>{setDescription(e.target.value)}}/>
            <label>Product Image</label>
            <input type='file' onChange={handleImageUpload}/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
        </div>
        : (<h1 style={{color:'red'}}>Select Firm To Add Product</h1>)
}
    </div>
  )
}

export default AddProduct