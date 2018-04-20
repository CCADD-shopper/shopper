import React from 'react';
import EditReviewStars from './review-stars-edit'
import {connect} from 'react-redux';

const ReviewEntry = (props) => {
  return (
    <div className="reviewEntry">
      <textarea
        description="description"
        type="text"
        required="required"
        placeholder="add your review"
        className="form-like" style={{height: 69, width: 200}} />
        <EditReviewStars product={props.selectedProduct} />
        <button className="positive small ui olive button">go on, be opinionated, ya jerk</button>
    </div>
  );
}

const mapStateToProps = ({ selectedProduct }) => ({ selectedProduct })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewEntry);
