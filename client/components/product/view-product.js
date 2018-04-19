import React from 'react';
import { connect } from 'react-redux';
import store, { getProductFromServerThunkerator, clearProduct } from '../../store'

class ViewProduct extends React.Component {
  constructor (){
    super()

  }
  componentDidMount(){
    const productId = this.props.match.params.productId;
    store.dispatch(getProductFromServerThunkerator(productId))
  }

  componentWillUnmount(){
    store.dispatch(clearProduct())
  }


  render() {
    const { name, price, description, qtyAvailable, imgUrl } = this.props.selectedProduct;

    return (
      <div className="productItem">
        <img src={imgUrl} />
        <h5>{name}</h5>
        <p>${price} - {qtyAvailable} on hand</p>
        <p>{description}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct }) => ({ selectedProduct })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
