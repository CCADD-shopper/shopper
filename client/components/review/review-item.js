import React from 'react';
import { connect } from 'react-redux';
import { ReviewItemStars } from '../review'


const ReviewItem = (props) => {

const reviewedProducts = props.productList.filter(product => props.review.productId === product.id);

  return (
        <div className="ui items">
          {
            props.review.map(review => (
                <div key={review.id} className="item">
                  <div className="reviewList">
                    <div className="ui blue circular segment">
                    <h2 className="header">{review.user.firstName} {review.user.lastName}</h2>
                    <h3>{reviewedProducts.name}</h3>
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

const mapStateToProps = ({productList}) => ({productList});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
