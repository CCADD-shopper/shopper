import React, {Component} from 'react'
import { connect } from 'react-redux'
import { removeProductfromCart } from '../../store/cart'

class CartItem extends Component{
  constructor(props){
    super(props)
    this.state = null
  }

  // handleDelete = () => {
  //   removeProductfromCart()
  // }

  render(){
    const { id, name, price, imgUrl } = this.props.product;
    return (
      <div className="cartItem">
            <img src={imgUrl} />
            <h5>{name}</h5>
            <p className="price">${price}</p>
            <p className="quantity">Quantity: {this.props.quantity}</p>
            <button className="ui red button" onClick={() => this.props.removeProductfromCart(id)}>Remove Item</button>
      </div>
    )
  }
}

const mapState = null

const mapDispatch = { removeProductfromCart }

export default connect(mapState, mapDispatch)(CartItem)
