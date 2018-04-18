import React from 'react';

const ViewProduct = (props) => {
  const { name, price, description, qtyAvailable, imgUrl } = props.product;
  return (
    <div className="productItem">
      <img src={imgUrl} />
      <h5>{name}</h5>
      <p>${price} - {qtyAvailable} on hand</p>
      <p>{description}</p>
    </div>
  );
}

const mapStateToProps = ({ productList }) => ({ productList });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
