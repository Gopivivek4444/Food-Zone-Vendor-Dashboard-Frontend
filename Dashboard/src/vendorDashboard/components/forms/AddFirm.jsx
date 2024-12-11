import React, { useState } from 'react'
import "../../styles/AddFirm.css"
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {

      // firmName, area, category,  region,  offer
      const [firmName, setFirmName] = useState("");
      const [area, setArea] = useState("");
      const [category, setCategory] = useState([]);
      const [region, setRegion] = useState([]);
      const [offer, setOffer] = useState("");
      const [file, setFile] = useState(null);

      const handleCategoryChange = (event)=>{
            const value = event.target.value;
            if (category.includes(value) ) {
                  setCategory(category.filter((item) => item!== value))
             } else {
                  setCategory( [ ...category, value])
             }
      }

      const handleRegionChange = (event)=>{
            const value = event.target.value;
            if (region.includes(value) ) {
                  setRegion(region.filter((item) => item!== value))
             } else {
                  setRegion( [ ...region, value])
             }
      }

      const handleImageUpload = (event) =>{
            const selectedImage = event.target.files[0];
            setFile(selectedImage);
      }

      const handleSubmitFirm = async(e) =>{
            e.preventDefault();
            try {
                  const loginToken = localStorage.getItem('loginToken');
                  if(!loginToken){
                        console.log("Token Not Found OR user not authenticated");
                  }

                  const formData = new FormData();
                  formData.append('firmName',firmName);
                  formData.append('area',area);
                  formData.append('offer',offer);
                  formData.append('image',file)

                  category.forEach((value) =>{
                        formData.append('category',value);
                  });
                  region.forEach((value) =>{
                        formData.append('region',value);
                  });

                  const response = await fetch(`${API_URL}/firm/addFirm`,{
                        method: 'POST',
                        headers:{
                          'token': `${loginToken}`
                        },
                        body: formData
                      })
                  const data = await response.json();
                  if(response.ok)
                  {
                        console.log(data)
                        alert("Firm Added Successfully")
                        setFirmName("");
                        setArea("");
                        setCategory([]);
                        setRegion([]);
                        setOffer("");
                        setFile(null);
                  }

                  const firmId = data.firmID;
                  localStorage.setItem('firmId',firmId)

            } catch (error) {
                  console.error("Failed to add Firm",error)
            }
      }

  return (
    <div className="firmSection">
        <form className='tableForm' onSubmit={handleSubmitFirm}>
            <label>Firm Name</label>
            <input type='text' value={firmName} onChange={(e) =>{setFirmName(e.target.value)}}/>
            <label>Area</label>
            <input type='text' value={area} onChange={(e) =>{setArea(e.target.value)}}/>
            <label>Category</label>
            <div className="checkInp">
              <div className="checkboxContainer">
                    <label>Veg</label>
                    <input className="checkBoxInp" type='checkbox'checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
              </div>
              <div className="checkboxContainer">
                    <label>Non-Veg</label>
                    <input className="checkBoxInp" type='checkbox' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
              </div>
            </div>
            <label>Region</label>         
            <div className="checkInp">
              <div className="checkboxContainer">
                    <label>South-Indian</label>
                    <input className="checkBoxInp" type='checkbox' value="south-indian" checked={region.includes('south-indian')}
                        onChange={handleRegionChange}
                    />
              </div>
              <div className="checkboxContainer">
                    <label>North-Indian</label>
                    <input className="checkBoxInp" type='checkbox' value= "north-indian" checked={region.includes('north-indian')}
                        onChange={handleRegionChange}
                    />
              </div>
              <div className="checkboxContainer">
                    <label>Chinese</label>
                    <input className="checkBoxInp" type='checkbox' value= "chinese" checked={region.includes('chinese')}
                        onChange={handleRegionChange}
                    />
              </div>
              <div className="checkboxContainer">
                    <label>Bakery</label>
                    <input className="checkBoxInp" type='checkbox' value="bakery" checked={region.includes('bakery')}
                        onChange={handleRegionChange}
                    />
              </div>
            </div>
            <label>Offer</label>
            <input type='text' value={offer} onChange={(e) =>{setOffer(e.target.value)}}/>
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload}/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm