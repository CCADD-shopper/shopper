import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderList } from '../order'
import store, { getOrdersFromServerThunkerator } from '../../store'


class UserView extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    store.dispatch(getOrdersFromServerThunkerator(this.props.user.id))
  }

  render(){
  let { email, firstName, googleId, isAdmin, lastName } = this.props.user;
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
    <div>
      <div className="userView">
        <img src="https://www.fillmurray.com/300/300" />
          <p>{email}</p>
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{externalInternal}</p>
          <p>{adminType}</p>
          {this.props.isAdmin &&
          <div>
            <button>TOGGLE ADMIN</button>
            <button> EDIT USER </button>
            <button> DELETE USER </button>
          </div>
          }
      </div>
      <br />
      <br />
      <div>
        <h3>Previous Orders</h3>
        <OrderList account={true} />
      </div>
  </div>
  );
}
}

const mapStateToProps = ({ reviews, user, orderList }) => ({ reviews, isAdmin: user.isAdmin, orderList })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
