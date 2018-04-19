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
        {cartItems.map(cartItem => {
          const product = this.findProductById(cartItem.productId)
          return (
          <div key={cartItem.productId}>
            <CartItem product={product} quantity={cartItem.quantity} />
          </div>)
        })}
      </div>
    )
  }
}

const mapState = ({productList}) => {
  return {
    cartItems: [{productId: 1, quantity: 2}, {productId: 2, quantity: 1}],
    productList,
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart)

