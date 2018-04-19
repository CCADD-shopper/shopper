import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './product-item';

const ProductList = (props) => {
  const { productList, selectedCategories } = props;
  const filteredProducts = productList.filter(product => {
    if (!selectedCategories.length) return true
    for (let i = 0; i < product.categories.length; i++) {
      if (selectedCategories.indexOf(product.categories[i].id) > -1) return true;
      return false;
    }
  })

  return (
    <div className="productList">
      {filteredProducts.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  );
}

const mapStateToProps = ({ productList, selectedCategories }) => ({ productList, selectedCategories });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
