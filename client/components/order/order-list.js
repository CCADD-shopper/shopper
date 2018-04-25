import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './order-item';

const OrderList = (props) => {
  const { orderList, account, user } = props;
  return (

    <div className="orderList">
      {account
      ? orderList.filter(order => order.userId === user.id).map(order => <OrderItem key={order.id} order={order} account={account} />)
      : orderList.map(order => <OrderItem key={order.id} order={order} />)
      }
    </div>
  );
}

const mapStateToProps = ({ orderList, user }) => ({ orderList, user });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
