import React from 'react';
import {connect} from 'react-redux';
import StarsReadOnly from './review-stars-read'

const ReviewItem = (props) => {
  return (
    <div className="productItem">
      <img src={imgUrl} />
      <h5>{name}</h5>
      <StarsReadOnly product={this.props.selectedProduct} />
        <div>
        <button className="ui blue button" onClick={this.toggleHidden.bind(this)} >
          Edit the review for this hat!
        </button>
        {!this.state.isHidden && <ReviewEntry product={this.props.selectedProduct} />}
      </div>
    </div>
  );
}

const mapStateToProps = ({ reviews }) => ({ reviews })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
