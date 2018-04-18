import React from 'react'
// import StarRatingComponent from 'react-star-rating-component'
import ReactStars from 'react-stars'


class EditReviewStars extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 1,
        }
        this.onStarClick = this.onStarClick.bind(this);
    }

    onStarClick(next, prev, name) {
        console.log(next, prev, name)
        this.setState({rating: next})
    }

    render() {
    const review = this.state.rating
    console.log(this.state);
    return (
        <div className="starRating">
            <p>Please Submit Your Rating</p>
            <ReactStars
            count={5}
            edit={true}
            size={24}
            value={review}
            onChange={this.onStarClick}
            />
        </div>
    )}
}

export default EditReviewStars;
