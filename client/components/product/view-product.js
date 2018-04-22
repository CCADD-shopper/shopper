import React from 'react';
import { connect } from 'react-redux';
import store, { getProductFromServerThunkerator, clearProduct, addProductToCart, getReviewsFromServerThunkerator } from '../../store'
import { StarsReadOnly, ReviewEntry, ReviewItem } from '../review'

class ViewProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.getProductFromServerThunkerator(productId);
  }

  componentWillUnmount() {
    this.props.clearProduct()
  }


  render() {
    const { id, name, price, description, qtyAvailable, imgUrl } = this.props.selectedProduct;
    const isLoggedIn = !!this.props.user.id

    return (
      <div className="productItem">
        <img src={imgUrl} />
        <h5>{name}</h5>
        <p>${price} - {qtyAvailable} on hand</p>
        <p>{description}</p>
        <button className="positive small right floated ui button" onClick={() => this.props.addProductToCart({ productId: id, quantity: 1 })}>Add to cart</button>
        <StarsReadOnly product={this.props.selectedProduct} />
        <div>
          {
            isLoggedIn
              ?
              <button className="ui blue button" onClick={this.toggleHidden.bind(this)} >
                Submit a review for this hat!
              </button>
              : <button className="ui blue button" >
                Please log in to submit a review!
              </button>
          }
          {!this.state.isHidden && <ReviewEntry product={this.props.selectedProduct} />}
        </div>
        <ReviewItem review={this.props.selectedProduct}/>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct, cart, user, reviews }) => ({ selectedProduct, cart, user, reviews })

const mapDispatchToProps = { getProductFromServerThunkerator, clearProduct, addProductToCart, getReviewsFromServerThunkerator };

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
