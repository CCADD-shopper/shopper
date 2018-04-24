import React from 'react';
import { connect } from 'react-redux';
import { ReviewItemStars } from '../review'


const ReviewItem = (props) => {

  return (
        <div className="ui items">
          {
            props.reviews.map(review => (
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

const mapStateToProps = ({ reviews }) => ({ reviews })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
