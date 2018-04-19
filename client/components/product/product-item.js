import React from 'react';
import {Link} from 'react-router-dom';

const ProductList = (props) => {
  const { name, price, description, qtyAvailable, imgUrl } = props.product;
  return (
      <Link className="thumbnail" to={`/products/${props.product.id}`}>
        <div className="productItem">
            <img src={imgUrl} />
            <h5>{name}</h5>
            <p>${price} - {qtyAvailable} on hand</p>
            <p>{description}</p>
        </div>
      </Link>
  );
}

export default ProductList;
