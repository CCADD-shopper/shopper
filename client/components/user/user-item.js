import React from 'react';

const UserList = (props) => {
  let { email, firstName, googleId, isAdmin, lastName } = props.user;

  if (isAdmin) {
    isAdmin = 'Admin User'
  } else {
    isAdmin = 'Normal User'
  }

  if (googleId) {
    googleId = 'Google User'
  } else {
    googleId = 'Local User'
  }

console.log(props)
  return (
    <div className="productItem">
      <img src="https://www.fillmurray.com/250/250" />
        <p>{email}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{googleId}</p>
        <p>{isAdmin}</p>
        <button>TOGGLE ADMIN</button>
        <button> EDIT USER </button>
        <button> DELETE USER </button>
    </div>
  );
}

export default UserList;
