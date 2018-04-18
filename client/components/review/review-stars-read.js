import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const ReviewStars = (props) => {
    const {review} = props
    return (
        <div className="starRating">
            <p>Star Rating</p>
            <StarRatingComponent
            name="rateDisplayOnly"
            starCount={5}
            editing={false}
            value={review}
            />
        </div>
    )
}

export default ReviewStars;
