import React from 'react'
import { connect } from 'react-redux'

const CartSummary = (props) => {
  console.log(props)
  const { cart } = this.props
  const totalItems = cart.length
  const totalCost = cart.reduce((acc, curr) => {
    return acc + curr.purchasePrice
  }, 0)
  console.log(totalItems, 'items', totalCost, 'cost')
  return (
        <div>
          <div> Total Items {cart}</div>
          <div> Total Cost ($USD) </div>
        </div>
    )
}

// orderId
// :
// null
// productId
// :
// 11
// purchasePrice
// :
// 19.31
// quantity
// :
// 1

  const mapState = null;
// (state) => {
//     return {
//       isLoggedIn: !!state.user.id,
//       cart: state.cart,
//       orderId: state.userCartOrderId,
//     }
  // }
  const mapDispatch = null;
  export default connect(mapState, mapDispatch)(CartSummary)
