import React from 'react'

const OrderDetail = (props) => {
  console.log('orderProduct', props.products)
  return (
    <div>
    <span onClick={props.handleClick}>Collapse Details</span>
      {
        props.products.map(product => <p key={product.id} >{product.id}</p>)
      }
    </div>
  )
}

export default OrderDetail
