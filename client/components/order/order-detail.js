import React from 'react'
import {Link} from 'react-router-dom'

const OrderDetail = (props) => {
  return (
    <div>
    <span onClick={props.handleClick}>Collapse Details</span>
      {
        props.products.map(product => {
          let lineItem = props.lineItems.filter(item => item.productId === product.id)
          lineItem = lineItem[0]
          console.log(lineItem)
        return (
          <div key={product.id}>
            <br />
            <Link to={`/products/${product.id}`}><div>{product.name}</div></Link>
            <div>Purchase Price: {lineItem.purchasePrice}</div>
            <div>Quantity: {lineItem.quantity}</div>
            <br />
          </div>
        )
      })
      }
    </div>
  )
}

export default OrderDetail
