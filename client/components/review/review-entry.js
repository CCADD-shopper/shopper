import React from 'react';
import EditReviewStars from './review-stars-edit'
import { connect } from 'react-redux'
import store, { addReviewToServerThunkerator } from '../../store'

class ReviewEntry extends React.Component {
  constructor() {
    super()
    this.state = {
      stars: 0,
    }
  }

  handleStarChange = (stars) => {
    this.setState({stars})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.props.user
    const userId = this.props.user.id
    const description = event.target.review.value
    const productId = this.props.selectedProduct.id
    const rating = this.state.stars
    const review = {
      description,
      userId,
      productId,
      rating,
      user,
    }
    store.dispatch(addReviewToServerThunkerator(review));
    event.target.review.value = '';
  }

  render () {

    return (
      <div className="reviewentry">
        <form onSubmit={this.handleSubmit} >
          <textarea
            name="review"
            description="description"
            type="text"
            required="required"
            placeholder="add your review"
            className="form-like" style={{ height: 69, width: 200 }} />
          <EditReviewStars rating={this.state.stars} handleStarChange={this.handleStarChange} />
          <button className="positive small ui olive button">go on, be opinionated, ya jerk</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct, user }) => ({ selectedProduct, user })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewEntry);
