import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE_REVIEWS   = 'INITIALIZE_REVIEWS';
const ADD_REVIEW           = 'ADD_REVIEW';
const REMOVE_REVIEW        = 'REMOVE_REVIEW';
const UPDATE_REVIEW        = 'UPDATE_REVIEW';

/* ------------     ACTION CREATORS      ------------------ */

const initReviews   = reviews => ({ type: INITIALIZE_REVIEWS, reviews });
const removeReview  = id => ({ type: REMOVE_REVIEW, id });
const addReview     = review => ({ type: ADD_REVIEW, review });
const updateReview  = review => ({ type: UPDATE_REVIEW, review });

/* ------------          REDUCER        ------------------ */

export default function reducer (reviews = [], action) {
  switch (action.type) {

    case INITIALIZE_REVIEWS:
      return action.reviews;

    case REMOVE_REVIEW:
      return reviews.filter(review => review.id !== action.id);

    case ADD_REVIEW:
      return [...reviews, action.review];

    case UPDATE_REVIEW:
      return reviews.map(review => (
        action.review.id === review.id ? action.review : review
      ));

    default:
      return reviews;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const getReviewsFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const reviews = await axios.get('/api/reviews');
      dispatch(initReviews(reviews.data));
    }
    catch (err) {
      console.log('Fetching Reviews unsuccessful', err);
    }
  }
}

export const removeReviewToServerThunkerator = id => {
  return async (dispatch) => {
    try {
      const review = await axios.delete(`/api/reviews/${id}`)
      dispatch(removeReview(review.id))
    }
    catch (err) {
      console.log(`Removing review: ${id} was unsuccesful`, err);
    }
  }
}

export const addReviewToServerThunkerator = review => {
  return async (dispatch) => {
    try {
      const newReview = await axios.post('/api/reviews', review)
      dispatch(addReview(newReview.data))
    }
    catch (err){
      console.log('adding review was unsuccesful', err);
    }
  }
}

export const updateReviewThunkerator = review => {
  return async (dispatch) => {
    try {
      const updatedReview = await axios.put(`/api/reviews/${review.id}`)
      dispatch(updateReview(updatedReview.data))
    }
    catch (err) {
      console.log(`updating review: ${review.id} was unsuccesful`);
    }
  }
}
