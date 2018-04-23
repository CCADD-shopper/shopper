import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import CartItem from './cart-item';
import { clearCart, clearCartItemsThunkerator } from '../../store/cart'

class Cart extends Component{
  constructor(props){
    super(props)

    this.findProductById = this.findProductById.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
  }

  handleSubmit = () => {
    //place holder
    console.log('submit')
  }

  findProductById = (productId) => {
    const targetProduct = this.props.productList.find(product => product.id === productId)
    return targetProduct;
  }

  checkoutHandler = (event) => {
    // event.preventDefault();


  }

  clearCartHandler = (id) => {
    if (this.props.isLoggedIn) {this.props.clearCartItemsThunkerator(id)}
    else {
      this.props.clearCart()
      localStorage.removeItem('cart')
    }
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
      <Link to="/checkout">
      <button className="ui green button" onClick={this.checkoutHandler}>Checkout</button>
      </Link>
      <button className="ui red button" onClick={() => this.clearCartHandler(this.props.orderId)}>Clear Cart</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    productList: state.productList,
    isLoggedIn: !!state.user.id,
    cartItems: state.cart,
    user: state.user,
    orderId: state.userCartOrderId
  }
}

const mapDispatch = { clearCart, clearCartItemsThunkerator };

export default connect(mapState, mapDispatch)(Cart)

