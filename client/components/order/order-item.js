import React from 'react';

const OrderItem = (props) => {
  const { id, status, userId } = props.order;
  return (
    <div className="orderItem">
      <h5>Order #{id}</h5>
      <p>Status: {status}</p>
      <p>User: {userId}</p>
    </div>
  );
}

export default OrderItem;
