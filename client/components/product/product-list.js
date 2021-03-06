import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './product-item';
import { LeftBar } from '../../components/'

const ProductList = (props) => {
  const { productList, selectedCategories } = props;
  const filteredProducts = productList.filter(product => {
    if (!selectedCategories.length) return true
    for (let i = 0; i < product.categories.length; i++) {
      if (selectedCategories.indexOf(product.categories[i].id) > -1) return true;
      return false;
    }
  }).filter(product => {
    return (product.qtyAvailable)
  }).filter(product => {
    return (product.name.toLowerCase().indexOf(props.searchParam.toLowerCase()) > -1)
  })


  return (
    <div className="contentWrapper">
      <LeftBar />
      <div className="mainContent">
      <div className="productList">
        {filteredProducts.map(product => <ProductItem key={product.id} product={product} />)}
      </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ productList, selectedCategories, searchParam }) => ({ productList, selectedCategories, searchParam });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
