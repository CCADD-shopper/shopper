import React from 'react';
import { connect } from 'react-redux';
import { ReviewItemStars } from '../review'
import { getUsersFromServerThunkerator } from '../../store'


const ReviewItem = (props) => {

  return (
        <div className="ui items">
          {
            props.review.map(review => (
                <div className="item">
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

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
