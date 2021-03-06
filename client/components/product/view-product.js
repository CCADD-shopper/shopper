import React from 'react';
import { connect } from 'react-redux';
import { StarsReadOnly, ReviewEntry, ReviewItem } from '../review'
import { handleClick } from './product-item'
import { clearReviews, getReviewsForProductThunkerator, getProductFromServerThunkerator, clearProduct, addProductToCart, getReviewsFromServerThunkerator, addLineItemThunkerator } from '../../store'

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
    this.props.getReviewsForProductThunkerator(productId);

  }

  componentWillUnmount() {
    this.props.clearProduct()
    this.props.clearReviews()
  }


  render() {
    const { id, name, price, description, qtyAvailable, imgUrl } = this.props.selectedProduct;

    const isLoggedIn = !!this.props.user.id
    let quantity = 1
    let orderId = this.props.userCartOrderId

    return (
      <div>
      <div className="productItem">
        <img src={imgUrl} />
        <h5>{name}</h5>
        <p>${price} - {qtyAvailable ? `${qtyAvailable} on hand` : 'This product is not currently available'}</p>
        <p>{description}</p>
        {
          qtyAvailable
            ? <button className="positive small right floated ui button" onClick={() => handleClick(this.props, { productId: id, quantity, purchasePrice: price, orderId })}>Add to cart</button>
            : ''
        }
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
      </div>
      <div className="reviewList">
        <ReviewItem />
      </div>

    </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct, cart, user, reviews, userCartOrderId }) => ({ selectedProduct, cart, user, reviews, userCartOrderId, isLoggedIn: !!user.id })

const mapDispatchToProps = { clearReviews, getReviewsForProductThunkerator, getProductFromServerThunkerator, clearProduct, addProductToCart, getReviewsFromServerThunkerator, addLineItemThunkerator };

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
