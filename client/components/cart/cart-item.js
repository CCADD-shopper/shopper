import React, {Component} from 'react'
import { connect } from 'react-redux'

class CartItem extends Component{
  constructor(props){
    super(props)
    this.state = null
  }

  handleDelete = () => {
    console.log('delete')
  }

  render(){
    const { name, price, imgUrl } = this.props.product;
    return (
      <div className="cartItem">
            <img src={imgUrl} />
            <h5>{name}</h5>
            <p className="price">${price}</p>
            <button onClick={this.handleDelete}>Remove Item</button>
            <p className="quantity">Quantity: {this.props.quantity}</p>
      </div>
    )
  }
}

const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(CartItem)
