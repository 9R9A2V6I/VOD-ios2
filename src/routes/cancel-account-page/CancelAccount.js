import React from 'react';
import './CancelAccount.css';
import { NavLink, useNavigate } from 'react-router-dom';
import SubmitBtn from '../../constant/submit-Btn/SubmitBtn';

const CancelAccount = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="cancel-container">
        <div className="cancel-box">
          <div className="account-top-btn">
            <h3 onClick={goBack}>Back</h3>
          </div>
          <h1 className="heading-font">Cancel</h1>
          <p className="cancel-account-para">
            Are you sure you want to cancel your virtual membership?
          </p>

          <button onClick={() => navigate('/account')} className="success-btn">
            Keep
          </button>

          <NavLink to="/account/cancel/reason">
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </NavLink>
        </div>
        <div className="hr-line-cancel"></div>
      </div>
    </>
  );
};

export default CancelAccount;
