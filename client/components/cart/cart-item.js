import React, {Component} from 'react'
import { connect } from 'react-redux'
import { removeProductfromCart, removeLineItemThunkerator } from '../../store/cart'

class CartItem extends Component{
  constructor(props){
    super(props)
    this.state = null
  }

  // handleDelete = () => {
  //   removeProductfromCart()
  // }

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

  render(){
    const { id, name, price, imgUrl } = this.props.product;
    return (
      <div className="cartItem">
            <img src={imgUrl} />
            <h5>{name}</h5>
            <p className="price">${price}</p>
            <p className="quantity">Quantity: {this.props.quantity}</p>
            <button className="ui red button" onClick={() => this.handleRemove(id)}>Remove Item</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    orderId: state.userCartOrderId,
  }
}

const mapDispatch = { removeProductfromCart, removeLineItemThunkerator }

export default connect(mapState, mapDispatch)(CartItem)
