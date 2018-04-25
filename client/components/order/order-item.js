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

  calculateTotal = () => {
    const {lineItems} = this.props.order
    let sum = 0
    lineItems.forEach(lineItem => {
      sum += (lineItem.quantity * lineItem.purchasePrice)
    });
    sum = (Math.floor(sum * 100)) / 100
    return parseFloat(sum)
  }

  render () {
    const orderStatusOptions = ['pending', 'processing', 'cancelled', 'completed']
    const { id, status, userId, products, lineItems, updatedAt } = this.props.order;
    const selectValue = this.state.selectValue || status
    const {account} = this.props
    return (
      <div className="orderItem">
        <h5>Order #{id} - {updatedAt.slice(0, 10)}</h5>
        {account ? <p>Status: {status}</p>

        : <div>
            <label>Status: </label>
            <select onChange={this.handleOrderStatusChange} value={selectValue}>
          {
            orderStatusOptions.map(option => <option key={option} value={option}>{option}</option>)
          }
            </select>
            <div>User: {userId}</div>
          </div>}
        {
          this.state.submitButtonVisible
            ? <button onClick={this.handleOrderEdit}>Update Order Status</button>
            : ''
        }
        <div>Total: {this.calculateTotal()}</div>
        {
          this.state.detailVisible
            ?
            <OrderDetail handleClick={this.handleClick} products={products} lineItems={lineItems} />
            :
            <div onClick={this.handleClick}>View Order Details</div>
        }
      </div>
    );
  }
}

export default OrderItem;
