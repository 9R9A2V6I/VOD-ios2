import React, { useState, useContext, useEffect } from 'react';
import './Account.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeContext';

function Account() {
  const [userData, setUserData] = useState({});

  const { bgColor, fontColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  const inputStyle = {
    backgroundColor: bgColor,
    color: fontColor,
    borderColor: '#C8CACC',
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

  // utils/maskEmail.js
  function maskEmail(email) {
    if (!email || email.length < 4) {
      return email; // Return email as-is if it's too short
    }

    const [localPart, domain] = email.split('@');
    const firstTwo = localPart.slice(0, 2);

    // Extract the last part after the last dot (e.g., .com, .in, .co)
    const domainParts = domain.split('.');
    const tld =
      domainParts.length > 1 ? `.${domainParts[domainParts.length - 1]}` : '';

    return `${firstTwo}****${tld}`;
  }


  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <style>{placeholderStyle}</style>
      <div className="account-container">
        <div className="account-content">
          <div className="account-top-btn">
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
                  value={maskEmail(userData.email) || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  placeholder="Active:[insert membership]"
                  style={inputStyle}
                  value={userData?.active ? 'Active' : 'No Active User'}
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
