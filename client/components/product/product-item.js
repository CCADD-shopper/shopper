import React from 'react';
import {Link} from 'react-router-dom';
import {StarsReadOnly} from '../review'
import { connect } from 'react-redux';
import { addProductToCart, addLineItemThunkerator } from '../../store'


const ProductItem = (props) => {
  const {id, name, price, description, qtyAvailable, imgUrl} = props.product;
  //place holders
  const quantity = 1;
  const orderId = 4
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

const handleClick = (props, item) => {
  if (props.isLoggedIn){
    props.addLineItemThunkerator(item)
  }
  else {
    props.addProductToCart(item)
  }

}

//------CONTAINER-------

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatchToProps = { addProductToCart, addLineItemThunkerator }


export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);


// export default ProductItem;
