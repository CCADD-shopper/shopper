import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { 
  getProductsFromServerThunkerator,
}
from '../store';

class ProductList extends Component {
  constructor() {
    super();
  }
  componentDidMount () {
    store.dispatch(getProductsFromServerThunkerator());
  }
  render() {
    console.log(this.props);
    const { productList } = this.props;
    return (
      <div>
      {productList.map(product => <p key={product.id} >{product.name}</p>)}
      </div>
    );
  }
}


const mapStateToProps = ({ productList }) => ({ productList });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
