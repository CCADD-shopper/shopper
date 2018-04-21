import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { StarsReadOnly } from '../review'


const ReviewItem = (props) => {
  const matchingReviews = props.reviews.filter(review => props.selectedProduct.id !== review.id)

  return (
    <div className="reviewItem">
        <div>
          { matchingReviews &&
            matchingReviews.map(review => (
              <h5>
                  <span>{review.description}</span>
              </h5>
            ))
          }
        </div>
      <StarsReadOnly product={props.selectedProduct} />
    </div>

  );
}

const mapStateToProps = ({ selectedProduct, reviews }) => ({ selectedProduct, reviews })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
