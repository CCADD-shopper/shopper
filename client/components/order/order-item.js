import React from 'react';

const OrderList = (props) => {
  console.log(props);
  const { id, status, userId } = props.order;
  return (
    <div className="orderItem">
      <h5>Order #{id}</h5>
      <p>Status: {status}</p>
      <p>User: {userId}</p>
    </div>
  );
}

export default OrderList;
