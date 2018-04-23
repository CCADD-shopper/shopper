import React from 'react'
import ReactStars from 'react-stars'

const ReviewItemStars = (props) => {
    const {rating} = props;

    return (
        <div className="starRating">
            <ReactStars
            count={5}
            // onChange={}
            size={24}
            edit={false}
            value={rating}
            />
        </div>
    )
}

export default ReviewItemStars;
