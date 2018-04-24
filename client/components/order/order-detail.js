import React from 'react'

const OrderDetail = (props) => {
  return (
    <div onClick={props.handleClick} >
      <h5>This is the order detail</h5>
    </div>
  )
}

export default OrderDetail
