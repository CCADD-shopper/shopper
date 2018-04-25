import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './order-item';

class OrderList extends React.Component {
  constructor() {
    super()
    this.state = {
      selectValue: 'all',
    }
  }

  handleChange = (event) => {
    this.setState({
      selectValue: event.target.value,
    })
  }

  render() {
    const { orderList, account, user } = this.props;
    const orderStatusOptions = ['all', 'pending', 'processing', 'cancelled', 'completed']
    return (
      <div className="orderList">
        {
          account
          ? orderList.filter(order => order.userId === user.id).map(order => <OrderItem key={order.id} order={order} account={account} />)
          : <div>
            Filter By Status: <select onChange={this.handleChange} >
              {
                orderStatusOptions.map(option => <option key={option} value={option}>{option}</option>)
              }
            </select>
            {
              orderList.filter(order => {
                if (this.state.selectValue !== 'all') return order.status === this.state.selectValue
                else return true
              }).map(order => <OrderItem key={order.id} order={order} />)
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ orderList, user }) => ({ orderList, user });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
