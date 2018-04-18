import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class EditReviewStars extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 1,
        }
        this.onStarClick = this.onStarClick.bind(this);
    }

    onStarClick(next, prev, name) {
        this.setState({rating: next})
    }

    render() {
    const {review} = this.state.rating
    console.log(this.state);
    return (
        <div className="starRating">
            <p>Please Submit Your Rating</p>
            <StarRatingComponent
            name="rateEdit"
            starCount={5}
            editing={true}
            value={review}
            onStarClick={this.onStarClick}
            />
        </div>
    )}
}

export default EditReviewStars;
