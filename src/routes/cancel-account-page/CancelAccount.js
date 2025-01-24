import React from 'react';
import './CancelAccount.css';
import { NavLink } from 'react-router-dom';
import SubmitBtn from '../../constant/submit-Btn/SubmitBtn';

const CancelAccount = () => {
  return (
    <>
      <div className="cancel-container">
        <div className="cancel-box">
          <h1 className="heading-font">Cancel</h1>
          <p className="cancel-account-para">
            Are you sure you want to cancel your virtual
            membership?
          </p>

          <SubmitBtn title={'Keep'} />
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
