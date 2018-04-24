import React from 'react';
import {OrderDetail} from '../order'
import store, { updateOrderStatusThunkerator } from '../../store'

class OrderItem extends React.Component {
  constructor () {
    super()
    this.state = {
      detailVisible: false,
      selectValue: null,
      submitButtonVisible: false,
    }
  }

  handleClick = () => {
    this.setState({ detailVisible: !this.state.detailVisible })
  }

  handleOrderStatusChange = (event) => {
    event.preventDefault()
    this.setState({ selectValue: event.target.value, submitButtonVisible: true })
  }

  handleOrderEdit = (event) => {
    event.preventDefault()
    store.dispatch(updateOrderStatusThunkerator(this.props.order.id, this.state.selectValue))
    this.setState({submitButtonVisible: false})
  }

  render () {
    const orderStatusOptions = ['pending', 'processing', 'cancelled', 'completed']
    const { id, status, userId, products } = this.props.order;
    const selectValue = this.state.selectValue || status
    return (
      <div className="orderItem">
        <h5>Order #{id}</h5>
        <label>Status: </label>
        <select onChange={this.handleOrderStatusChange} value={selectValue}>
          {
            orderStatusOptions.map(option => <option key={option} value={option}>{option}</option>)
          }
        </select>
        <p>User: {userId}</p>
        {
          this.state.submitButtonVisible
            ? <button onClick={this.handleOrderEdit}>Update Order Status</button>
            : ''
        }
        {
          this.state.detailVisible
            ?
            <OrderDetail handleClick={this.handleClick} products={products} />
            :
            <div onClick={this.handleClick}>View Order Details</div>
        }
      </div>
    );
  }
}

export default OrderItem;
