import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductItem from './product/product-item';

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
            <ProductItem product={product} />
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

