import React from 'react';
import {Link} from 'react-router-dom';
import {StarsReadOnly} from '../review'

const ProductItem = (props) => {
  const {name, price, description, qtyAvailable, imgUrl} = props.product;
  return (<div className="productItem">
    <Link className="thumbnail" to={`/products/${props.product.id}`}>
      <img src={imgUrl}/>
      <h5>{name}</h5>
    </Link>
    <p> ${price} - {qtyAvailable} on hand</p>
    <p>{description}</p>
    <button className="positive small right floated ui button">Add to cart</button>
    <StarsReadOnly product={props.product}/>
  </div>);
}

export default ProductItem;
