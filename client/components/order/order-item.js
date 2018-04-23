import React from 'react';

const OrderItem = (props) => {
  const { id, status, user } = props.order;
  return (
    <div className="orderItem">
      <h5>Order #{id}</h5>
      <p>Status: {status}</p>
      <p>User: {user.firstName + ' ' + user.lastName}</p>
    </div>
  );
}

export default OrderItem;
