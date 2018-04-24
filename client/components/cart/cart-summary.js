import React from 'react'
import { connect } from 'react-redux'

const CartSummary = (props) => {
  const { cart } = props
  const totalItems = cart.length
  const totalCost = cart.reduce((acc, curr) => {
    return acc + curr.purchasePrice
  }, 0)
  const floatCost = parseFloat(Math.round(totalCost * 100) / 100).toFixed(2);
  return (
        <div className="sub-total-parent">
          <div className="sub-total-count"> Total Items: {totalItems}</div>
          <div className="sub-total-cost"> Total Cost: ($USD) {floatCost} </div>
        </div>
    )
}

  const mapState = null;
  const mapDispatch = null;
  export default connect(mapState, mapDispatch)(CartSummary)
