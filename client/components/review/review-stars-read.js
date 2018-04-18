import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const StarsReadOnly = (props) => {
    const {averageRating, numOfReviews} = props.product
    console.log(props.product)
    return (
        <div className="starRating">
            <p>Average User Rating of ({numOfReviews}) Reviews</p>
            <StarRatingComponent
            name="rateDisplayOnly"
            starCount={5}
            editing={false}
            value={averageRating}
            />
        </div>
    )
}

export default StarsReadOnly;
