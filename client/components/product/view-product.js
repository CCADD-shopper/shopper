import React from 'react';
import { connect } from 'react-redux';
import store, { getProductFromServerThunkerator, clearProduct } from '../../store'
import { StarsReadOnly, EditReviewStars } from '../review'

class ViewProduct extends React.Component {
  constructor (){
    super()

  }

  componentDidMount(){
    const productId = this.props.match.params.productId;
    this.props.getProductFromServerThunkerator(productId)
  }

  componentWillUnmount(){
    this.props.clearProduct()
  }


  render() {
    const { name, price, description, qtyAvailable, imgUrl } = this.props.selectedProduct;

    return (
      <div className="productItem">
        <img src={imgUrl} />
        <h5>{name}</h5>
        <p>${price} - {qtyAvailable} on hand</p>
        <p>{description}</p>
        <StarsReadOnly product={this.props.selectedProduct} />
        <EditReviewStars product={this.props.selectedProduct} />
      </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct, cart }) => ({ selectedProduct, cart })

const mapDispatchToProps = { getProductFromServerThunkerator, clearProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
