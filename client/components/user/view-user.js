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
          <h2>{email}</h2>
          <h3>{firstName}</h3>
          <h3>{lastName}</h3>
          <h3>{externalInternal}</h3>
          <h3>{adminType}</h3>
          {this.props.isAdmin &&
          <div>
            <button className="ui button blue">TOGGLE ADMIN</button>
            <button className="ui button blue"> EDIT USER </button>
            <button className="ui button red"> DELETE USER </button>
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
