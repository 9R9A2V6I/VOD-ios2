import React, { useState, useContext, useEffect } from 'react';
import './Account.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeContext';

function Account() {
 
  const [userData, setUserData] = useState({});

  const { bgColor, fontColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };



  const inputStyle = {
    backgroundColor: bgColor,
    color: fontColor,
    borderColor: "#C8CACC",
  };

  const placeholderStyle = `
    ::placeholder {
      color: ${fontColor};
    }
  `;

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData'); 
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData); 
      setUserData(parsedData);
    }
  }, []);

  return (
    <>
      <style>{placeholderStyle}</style>
      <div className="account-container">
        <div className="account-content">
          <div className='account-top-btn'>
            <h3 onClick={goBack}>Back</h3>
          </div>
          <div className="basic-info">
            <h3 className="heading-font-account">Profile</h3>
            <form className="account-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Demo IPSTUDIO"
                  style={inputStyle}
                  value={userData.fullname || ''} 
                  readOnly 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Demo"
                  style={inputStyle}
                  value={userData.email || ''} 
                  readOnly 
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  placeholder="Active:[insert membership]"
                  style={inputStyle}
                  value={userData.active ? 'Active' : 'No Active User'} 
                  readOnly 
                />
              </div>
              <div className="form-actions">
                <NavLink to="/account/cancel">
                  <button type="button" className="cancel-button">
                    Cancel
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
