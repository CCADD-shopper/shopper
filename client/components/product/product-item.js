import React from 'react';
import {Link} from 'react-router-dom';
import {StarsReadOnly} from '../review'
import { connect } from 'react-redux';
import { addProductToCart } from '../../store'


const ProductItem = (props) => {
  const {id, name, price, description, qtyAvailable, imgUrl} = props.product;

  return (
    <div className="productItem">
      <Link className="thumbnail" to={`/products/${props.product.id}`}>
        <img src={imgUrl} />
        <h5>{name}</h5>
      </Link>
      <p> ${price} - {qtyAvailable} on hand</p>
      <p>{description}</p>
      <button className="positive small right floated ui button" onClick={ () => props.addProductToCart({productId: id, quantity: 1})}>Add to cart</button>
      <StarsReadOnly product={props.product} />
  </div>);
}

//------CONTAINER-------

const mapStateToProps = null;

const mapDispatchToProps = { addProductToCart }


export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);


// export default ProductItem;
