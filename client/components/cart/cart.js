import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from './cart-item';
import { clearCart } from '../../store/cart'

class Cart extends Component{
  constructor(props){
    super(props)

    this.findProductById = this.findProductById.bind(this);
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
    // this.props.cartItems.forEach(item => console.log(item.productId))
    // this.findProductById(this.props.cartItems[0].productId))
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
      <button className="ui red button" onClick={() => this.props.clearCart()}>Clear Cart</button>
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

const mapDispatch = { clearCart };

export default connect(mapState, mapDispatch)(Cart)

