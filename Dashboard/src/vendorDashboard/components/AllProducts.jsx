import React, { useEffect, useState } from 'react'
import { API_URL } from '../data/apiPath';
import '../styles/AllProducts.css'
const AllProducts = () => {

    const [products, setProducts] = useState([])

    const firmId = localStorage.getItem('firmId');

    const productHandler = async() =>{
        const firmId = localStorage.getItem('firmId')
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`)
            const productData = await response.json()
            setProducts(productData.products)
            console.log(productData)
        } catch (error) {
            console.error('failed to fetch products',error)
            alert('failed to fetch products')
        }
    }

    const deleteProductById = async (productId) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
    
        try {
            const response = await fetch(`${API_URL}/product/deleteProduct/${productId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProducts(products.filter(item => item._id !== productId));
                alert('Product deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete Product', error);
            alert('Failed to delete Product');
        }
    };
    

    useEffect(() => {
        productHandler();
        console.log('This is UseEffect')
    },[])

  return (
    <div className="all-products-container">
        {firmId?
        <>
        {products.length === 0? (<p className="no-products"> No Products Added</p>) : (
            <table className='all-products-table'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item) =>{
                            return(
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} className="product-image" />
                                        )}
                                    </td>
                                    <td>
                                        <button className="delete-button" onClick={() => deleteProductById(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )}
        </>
        :(<h1 style={{textAlign:'center', color:'red'}}>Select Firm To See Products</h1>)}
    </div>
  )
}

export default AllProducts
