import React from 'react'

const OrderDetail = (props) => {
  return (
    <div>
    <button className="ui violet button"s onClick={props.handleClick}>Collapse Details</button>
      {
        props.products.map(product => <p key={product.id} >{product.id}</p>)
      }
    </div>
  )
}

export default OrderDetail
