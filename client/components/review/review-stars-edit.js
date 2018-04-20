import React from 'react'
// import StarRatingComponent from 'react-star-rating-component'
import ReactStars from 'react-stars'


const EditReviewStars = (props) => {
  return (
    <div className="starRating">
      <p>Please Submit Your Rating</p>
      <ReactStars
        count={5}
        edit={true}
        size={24}
        value={props.rating}
        onChange={props.handleStarChange}
        half={false}
      />
    </div>
  )
}

export default EditReviewStars;
