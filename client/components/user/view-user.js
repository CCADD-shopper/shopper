import React from 'react';
import {  } from '../'

const UserView = (props) => {
  let { email, firstName, googleId, isAdmin, lastName } = props.user;
  let externalInternal, adminType
  if (isAdmin) {
    adminType = 'Admin User'
  } else {
    adminType = 'Normal User'
  }

  if (googleId) {
    externalInternal = 'Google User'
  } else {
    externalInternal = 'Local User'
  }

  return (
    //need to update this once necessary
    <div className="userView">
      <img src="https://www.fillmurray.com/300/300" />
        <p>{email}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{externalInternal}</p>
        <p>{adminType}</p>
    </div>
  );
}

export default UserView;
