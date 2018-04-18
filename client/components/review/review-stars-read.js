import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const StarsReadOnly = (props) => {
    const {review, numberOfReviews} = props
    return (
        <div className="starRating">
            <p>Average User Rating of ({numberOfReviews}) Reviews</p>
            <StarRatingComponent
            name="rateDisplayOnly"
            starCount={5}
            editing={false}
            value={review}
            />
        </div>
    )
}

export default StarsReadOnly;
