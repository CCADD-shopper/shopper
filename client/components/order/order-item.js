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
    const {account} = this.props
    return (
      <div className="orderItem">
        <h3>Order #{id}</h3>
        {account ? <h3>Status: {status}</h3>

        : <div>
            <label>Status: </label>
            <select onChange={this.handleOrderStatusChange} value={selectValue}>
          {
            orderStatusOptions.map(option => <option key={option} value={option}>{option}</option>)
          }
            </select>
          </div>}

        {
          this.state.submitButtonVisible
            ? <button class="ui green button" onClick={this.handleOrderEdit}>Update Order Status</button>
            : ''
        }
        {
          this.state.detailVisible
            ?
            <OrderDetail handleClick={this.handleClick} products={products} />
            :
            <div className="ui violet button" onClick={this.handleClick}>View Order Details</div>
        }
      </div>
    );
  }
}

export default OrderItem;
