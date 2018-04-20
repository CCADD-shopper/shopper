import React from 'react';
import EditReviewStars from './review-stars-edit'
import { connect } from 'react-redux'

class ReviewEntry extends React.Component {
  constructor() {
    super()
    this.state = {
      stars: 0,
    }
  }

  handleStarChange = (stars) => {
    console.log(stars)
    this.setState({stars})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const reviewContent = event.target.review.value
    
    console.log(this.state.stars);
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
          <button className="positive small ui olive button">gone on, be opinionated, ya jerk</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct }) => ({ selectedProduct })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewEntry);
