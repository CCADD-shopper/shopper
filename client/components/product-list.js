import React from 'react';
import { connect } from 'react-redux';

const ProductList = (props) => {
  const { productList } = props;
  return (
    <div>
      {productList.map(product => <p key={product.id} >{product.name}</p>)}
    </div>
  );
}



const mapStateToProps = ({ productList }) => ({ productList });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
