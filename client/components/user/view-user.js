import React from 'react';
import { connect } from 'react-redux';
import { ReviewItem } from '../review'


const UserView = (props) => {
  let { email, firstName, googleId, isAdmin, lastName } = props.user;
  let externalInternal, adminType
  const usersReviews = props.reviews.filter(review => props.user.id === review.userId);
console.log(props.user.id, usersReviews);
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
    <div>
    <div className="userView">
      <img src="https://www.fillmurray.com/300/300" />
        <p>{email}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{externalInternal}</p>
        <p>{adminType}</p>
        <button>TOGGLE ADMIN</button>
        <button> EDIT USER </button>
        <button> DELETE USER </button>
    </div>
    <ReviewItem review={usersReviews} />
  </div>
  );
}

const mapStateToProps = ({ reviews }) => ({ reviews })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
