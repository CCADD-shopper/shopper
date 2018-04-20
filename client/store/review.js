import axios from 'axios';





/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE    = 'INITIALIZE_REVIEWS';
const CREATE        = 'CREATE_REVIEW';
const REMOVE        = 'REMOVE_REVIEW';
const UPDATE        = 'UPDATE_REVIEW';

/* ------------     ACTION CREATORS      ------------------ */

const init   = reviews => ({ type: INITIALIZE, reviews });
const create = review => ({ type: CREATE, review });
const remove = id => ({ type: REMOVE, id });
const update = review => ({ type: UPDATE, review });

/* ------------          REDUCER         ------------------ */

export default function reducer (reviews = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.reviews;

    case CREATE:
      return [action.review, ...reviews];

    case REMOVE:
      return reviews.filter(review => review.id !== action.id);

    case UPDATE:
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
      dispatch(init(reviews.data));
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
      dispatch(remove(review.id))
    }
    catch (err) {
      console.log(`Removing review: ${id} unsuccesful`, err);
    }
  }
}
export const addReview = review => dispatch => {
  axios.post('/api/reviews/', review)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating review: ${review} unsuccesful`, err));
};

export const updateReview = (review) => dispatch => {
  axios.put(`/api/reviews/edit/${review.id}`)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating review: ${review.id} unsuccesful`, err));
};
