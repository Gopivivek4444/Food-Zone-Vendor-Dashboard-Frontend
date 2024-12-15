import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/apiPath';
import "../styles/VendorFirms.css";

const VendorFirms = ({showAddProductHandler}) => {
  const [vendorFirms, setVendorFirms] = useState([]);
  const [error, setError] = useState(null);
  const [vendorID, setVendorID] = useState("");

  const setLocalStorageFirmIdHandler = (firmId,firmName) =>{
    localStorage.setItem('firmId',firmId);
    localStorage.setItem('firmName',firmName);
  }

  useEffect(() => {
    // Decode vendorId from token and set it
    const Token = localStorage.getItem('loginToken');
    if (Token) {
      const base64Url = Token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );

      const { vendorId } = JSON.parse(jsonPayload);
      setVendorID(vendorId);
    }
  }, []);

  useEffect(() => {
    // Fetch vendor firms only when vendorID is available
    if (vendorID) {
      const fetchVendorFirms = async () => {
        try {
          const response = await fetch(`${API_URL}/vendor/vendorFirms/${vendorID}`);
          if (!response.ok) {
            throw new Error('Failed to fetch vendor firms');
          }
          const data = await response.json();
          setVendorFirms(data.vendorFirms);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchVendorFirms();
    }
  }, [vendorID]);

  return (
    <div className='vendorFirmsCollection'>
      <h2>Vendor Firms</h2>
      <h3>Choose Any Firm To Add Products</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {vendorFirms.length > 0 ? (
        <ul>
          {vendorFirms.map((firm) => (
        
            <li key={firm._id} onClick={() => {
                  setLocalStorageFirmIdHandler(firm._id,firm.firmName);
                  showAddProductHandler();
                }}>
              <strong>Firm ID:</strong> {firm._id} <br />
              <strong>Firm Name:</strong> {firm.firmName}
            </li>
           
          ))}
        </ul>
      ) : (
        <p>No firms found for this vendor.</p>
      )}
    </div>
  );
};

export default VendorFirms;
