import React from 'react';
import {OrderDetail} from '../order'

class OrderItem extends React.Component {
  constructor () {
    super()
    this.state = {
      detailVisible: false,
    }
  }

  handleClick = () => {
    this.setState({detailVisible: !this.state.detailVisible})
  }

  render () {
    const { id, status, userId } = this.props.order;
    return (
      <div className="orderItem">
        <h5>Order #{id}</h5>
        <p>Status: {status}</p>
        <p>User: {userId}</p>
        
        {
          this.state.detailVisible
            ?
            <OrderDetail handleClick={this.handleClick} />
            :
            <div onClick={this.handleClick}>View Order Details</div>
        }
      </div>
    );
  }
}

export default OrderItem;
