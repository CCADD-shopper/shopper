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

  handleRemove = (id) => {
    if (this.props.isLoggedIn){
      const targetItem = {productId: id, orderId: this.props.orderId}
      this.props.removeLineItemThunkerator(targetItem)

    }
    else {
      this.props.removeProductfromCart(id)
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
