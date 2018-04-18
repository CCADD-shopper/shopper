import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class EditReviewStars extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 1,
        }
    }

    onStarClick(next, prev, name) {
        this.setState({rating: next})
    }

    render() {
    const {review} = this.state.rating
    return (
        <div className="starRating">
            <p>Star Rating</p>
            <StarRatingComponent
            name="rateEdit"
            starCount={5}
            editing={true}
            value={review}
            onStarClick={this.onStarClick.bind(this)}
            />
        </div>
    )}
}

export default EditReviewStars;
