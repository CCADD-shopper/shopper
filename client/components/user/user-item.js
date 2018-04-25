import React from 'react';
import { connect } from 'react-redux'
import store, { toggleAdminThunkerator, deleteUserThunkerator, triggerPasswordResetThunkerator } from '../../store'

const UserItem = (props) => {
  let { id, changePasswordFlag, email, firstName, googleId, isAdmin, lastName } = props.user;
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
    <div className="cartItem">
      <img src="https://www.fillmurray.com/250/250" />
        <p>{email}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{externalInternal}</p>
        <p>{adminType}</p>

        <button className="ui button blue" onClick={props.handleAdminToggle} >TOGGLE ADMIN</button>
        <button className="ui button green" > EDIT USER </button>
        <button className="ui button red"  onClick={props.handleDeleteUser} > DELETE USER </button>
        <button className="ui button red"  value={id} disabled={changePasswordFlag} onClick={props.triggerPassReset} > TRIGGER PASSWORD RESET </button>
    
    </div>
  );
}

const mapStateToProps = null

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAdminToggle: (event) => {
      event.preventDefault()
      if (ownProps.loggedInUser.isAdmin) {
        store.dispatch(toggleAdminThunkerator(ownProps.user.id));
      }
    },
    handleDeleteUser: (event) => {
      event.preventDefault()
      if (ownProps.loggedInUser.isAdmin) {
        store.dispatch(deleteUserThunkerator(ownProps.user.id))
      }
    },
    triggerPassReset: (event) => {
      event.preventDefault();
      store.dispatch(triggerPasswordResetThunkerator(+event.target.value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
