import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './product-item';

const ProductList = (props) => {
  const { productList } = props;
  return (
      <div className="productList">
        {productList.map(product => <ProductItem key={product.id} product={product} />)}
      </div>
  );
}

const mapStateToProps = ({ productList }) => ({ productList });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
