import React from 'react';
import { connect } from 'react-redux';

const ViewProduct = (props) => {
  const products = props.productList;
  const urlId = props.match.params.productId;
  const singleProduct = products.length && products.find(product => +urlId === product.id);
  const { name, price, description, qtyAvailable, imgUrl } = singleProduct;
  return (
    <div className="productItem">
      <img src={imgUrl} />
      <h5>{name}</h5>
      <p>${price} - {qtyAvailable} on hand</p>
      <p>{description}</p>
    </div>
  );
}

const mapStateToProps = ({ productList }) => ({ productList })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
