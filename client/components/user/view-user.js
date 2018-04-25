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
      <div className="userview">
        <img src="https://www.fillmurray.com/300/300" />
          <h1>{firstName} {lastName}</h1>
          <h2>{email}</h2>
          <p>{externalInternal}</p>
          <p>{adminType}</p>
          {this.props.isAdmin &&
          <div>
            <button className="ui blue button">TOGGLE ADMIN</button>
            <button className="ui green button"> EDIT USER </button>
            <button className="ui red button"> DELETE USER </button>
          </div>
          }
      </div>
      <br />
      <br />
      <div className="prevorders">
        <h2>Previous Orders</h2>
        <OrderList account={true} />
      </div>
  </div>
  );
}
}

const mapStateToProps = ({ reviews, user, orderList }) => ({ reviews, isAdmin: user.isAdmin, orderList })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
