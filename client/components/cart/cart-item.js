import React, {Component} from 'react'
import { connect } from 'react-redux'
import { removeProductfromCart, removeLineItemThunkerator, editLineItemThunkerator, alterCartQuantity } from '../../store/cart'

class CartItem extends Component{
  constructor(props){
    super(props)
    this.state = null
  }

  handleRemove = (productId) => {
    if (this.props.isLoggedIn){
      const targetItem = {productId, orderId: this.props.orderId}
      this.props.removeLineItemThunkerator(targetItem)

    }
    else {
      const oldCart = JSON.parse(localStorage.getItem('cart'))
      const newCart = JSON.stringify(oldCart.filter(cartItem => cartItem.productId !== productId))
      localStorage.setItem('cart', newCart)
      this.props.removeProductfromCart(productId)
    }
  }

  // handleDecrement = (newItem) => {
  //     if (this.props.isLoggedIn){
  //       const foundItem = this.props.cart.filter(item => item.productId === newItem.productId)
  //       if (foundItem.length){
  //         newItem.quantity = foundItem[0].quantity - newItem.quantity
  //         this.props.editLineItemThunkerator(newItem)
  //       }
  //     }
  //     //unauth
  //     else {
  //       this.props.alterCartQuantity(newItem.productId, 'dec')
  //     }
  //   }

  // handleIncrement = (newItem) => {
  //   if (this.props.isLoggedIn){
  //     const foundItem = this.props.cart.filter(item => item.productId === newItem.productId)
  //     if (foundItem.length){
  //       newItem.quantity = newItem.quantity + foundItem[0].quantity
  //       this.props.editLineItemThunkerator(newItem)
  //     }
  //     else {  }
  //   }
  //   //unauth
  //   else {
  //     this.props.alterCartQuantity(newItem.productId, 'inc')
  //   }
  // }

  render(){
    const { id, name, price, imgUrl } = this.props.product;
    // const quantity = 1;
    // const input  = {quantity, purchasePrice: price, orderId: this.props.orderId, productId: id}
    // const product = this.props.product
    // console.log(product);
    return (
      <div className="cartItem">
            <img src={imgUrl} />
            <h5>{name}</h5>
            <p className="price">${price}</p>
            <div className="button-box">
              {/* <button className="ui button left attached blue" onClick={() => this.handleDecrement(input)}> - </button> */}
              <p className="quantity">Quantity: {this.props.quantity}</p>
              {/* <button className="ui right attached button blue" onClick={() => this.handleIncrement(input)}> + </button> */}
            </div>
            <button className="ui red button" onClick={() => this.handleRemove(id)}>Remove Item</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    orderId: state.userCartOrderId,
  }
}

const mapDispatch = { removeProductfromCart, removeLineItemThunkerator, editLineItemThunkerator, alterCartQuantity }

export default connect(mapState, mapDispatch)(CartItem)
