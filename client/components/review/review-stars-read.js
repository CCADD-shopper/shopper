import React from 'react'
import ReactStars from 'react-stars'

const StarsReadOnly = (props) => {
    const {averageRating, numOfReviews} = props.product
    return (
        <div className="starRating">
            <p>Average User Rating based on ({numOfReviews}) Reviews</p>
            <ReactStars
            count={5}
            // onChange={}
            size={24}
            edit={false}
            value={averageRating}
            />
        </div>
    )
}

export default StarsReadOnly;
