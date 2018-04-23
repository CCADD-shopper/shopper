import React from 'react';
import {Link} from 'react-router-dom';
import {StarsReadOnly} from '../review'
import { connect } from 'react-redux';
import { addProductToCart, addLineItemThunkerator, editLineItemThunkerator } from '../../store'


const ProductItem = (props) => {
  const {id, name, price, description, qtyAvailable, imgUrl} = props.product;
  //place holders
  const quantity = 1
  const orderId = props.orderId
  return (
    <div className="productItem">
      <Link className="thumbnail" to={`/products/${props.product.id}`}>
        <img src={imgUrl} />
        <h5>{name}</h5>
      </Link>
      <p> ${price} - {qtyAvailable} on hand</p>
      <p>{description}</p>
      <button className="positive small right floated ui button" onClick={ () => handleClick(props, {quantity, purchasePrice: price, orderId, productId: id})}>Add to cart</button>
      <StarsReadOnly product={props.product} />
  </div>);
}

export const handleClick = (props, newItem) => {
  if (props.isLoggedIn){
    const foundItem = props.cart.filter(item => item.productId === newItem.productId)
    if (foundItem.length){
      newItem.quantity = newItem.quantity + foundItem[0].quantity
      props.editLineItemThunkerator(newItem)
    }
    else {
      props.addLineItemThunkerator(newItem)
    }
  }
  else {
    props.addProductToCart(newItem)
    let oldCart;
    let newCart;
    if (!JSON.parse(localStorage.getItem('cart'))) {newCart = JSON.stringify([newItem])}
    else {
      oldCart = JSON.parse(localStorage.getItem('cart'))
      let found = oldCart.filter(cartThing => cartThing.productId === newItem.productId)
      if (found.length) {
        found[0].quantity = found[0].quantity + newItem.quantity;
        let existing = oldCart.filter(cartThing => cartThing.productId !== newItem.productId)
        if (existing.length){
          newCart = JSON.stringify([...existing, found[0]])
        }
        else {
          newCart = JSON.stringify([found[0]])
        }
      }
      else {
        newCart = JSON.stringify([...oldCart, newItem])
      }
    }
    localStorage.setItem('cart', newCart)
  }
}

//------CONTAINER-------

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    orderId: state.userCartOrderId
  }
}

const mapDispatchToProps = { addProductToCart, addLineItemThunkerator, editLineItemThunkerator }


export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);


// export default ProductItem;
