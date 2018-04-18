import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './order-item';

const OrderList = (props) => {
  const { orderList } = props;
  return (
    <div className="orderList">
      {orderList.map(order => <OrderItem key={order.id} order={order} />)}
    </div>
  );
}

const mapStateToProps = ({ orderList }) => ({ orderList });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
