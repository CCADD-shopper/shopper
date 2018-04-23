import React from 'react';
import { connect } from 'react-redux';
import { ReviewItemStars } from '../review'


const ProductReviewItems = (props) => {
const matchingReviews = props.reviews.filter(review => props.selectedProduct.id === review.productId);

  return (
        <div className="ui items">
          {
            matchingReviews.map(review => (
                <div key={review.id} className="item">
                  <div className="reviewList">
                    <div className="ui blue circular segment">
                    <h2 className="header">{review.user.firstName} {review.user.lastName}</h2>
                    <ReviewItemStars rating={review.rating} />
                    <div className="meta">
                      <span>{review.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
            ))
          }
    </div>
  );
}

const mapStateToProps = ({ user, reviews, selectedProduct }) => ({ user, reviews, selectedProduct })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewItems);
