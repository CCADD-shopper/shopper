import React from 'react';
import {Link} from 'react-router-dom';
import { StarsReadOnly } from '../review'

const ProductList = (props) => {
  const { name, price, description, qtyAvailable, imgUrl } = props.product;
  return (
    <div className="productItem">
      <Link className="thumbnail" to={`/products/${props.product.id}`}>
        <img src={imgUrl} />
        <h5>{name}</h5>
        <p>${price} - {qtyAvailable} on hand</p>
        <p>{description}</p>
      </Link>
      <StarsReadOnly />
    </div>
  );
}

export default ProductList;
