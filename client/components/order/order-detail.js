import React from 'react'
import {Link} from 'react-router-dom'

const OrderDetail = (props) => {
  return (
    <div>
    <button className="ui violet button"s onClick={props.handleClick}>Collapse Details</button>
      {
        props.products.map(product => {
          let lineItem = props.lineItems.filter(item => item.productId === product.id)
          lineItem = lineItem[0]
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
