import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
})
export const clearCategories = () => ({
  type: CLEAR_CATEGORIES
})

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_CATEGORIES:
      return action.categories;

    case CLEAR_CATEGORIES:
      return [];

    default:
      return prevState;
  }
}
