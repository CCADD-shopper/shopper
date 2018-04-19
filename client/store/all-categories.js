import axios from 'axios';

const GET_ALL_CATEGORIES_FROM_SERVER = 'GET_ALL_CATEGORIES_FROM_SERVER';

export const getCategoriesFromServer = (categories) => ({
  type: GET_ALL_CATEGORIES_FROM_SERVER,
  categories,
})

//thunks
export const getCategoriesFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const allCategories = await axios.get('/api/categories');
      dispatch(getCategoriesFromServer(allCategories.data));
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case GET_ALL_CATEGORIES_FROM_SERVER:
      return action.categories;

    default: return prevState;
  }
}
