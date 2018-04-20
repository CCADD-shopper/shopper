import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from './cart-item';

class Cart extends Component{
  constructor(props){
    super(props)
  }

  handleSubmit = () => {
    //place holder
    console.log('submit')
  }

  findProductById = (productId) => {
    const targetProduct = this.props.productList.find(product => product.id === productId)
    return targetProduct;
  }

  render(){
    const {cartItems} = this.props
    return (
      <div>
        <h2>Shopping Cart</h2>
        {cartItems.length ? (cartItems.map(cartItem => {
          const product = this.findProductById(cartItem.productId)
          return (
          <div key={cartItem.productId}>
            <CartItem product={product} quantity={cartItem.quantity} />
          </div>)
        })) : <h3>No items</h3>}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    productList: state.productList,
    cartItems: state.cart,
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart)

