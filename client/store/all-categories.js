import axios from 'axios';

const GET_ALL_CATEGORIES_FROM_SERVER = 'GET_ALL_CATEGORIES_FROM_SERVER'
const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

export const getCategoriesFromServer = (categories) => ({
  type: GET_ALL_CATEGORIES_FROM_SERVER,
  categories,
})

export const addNewCategory = (category) => ({
  type: ADD_NEW_CATEGORY,
  category,
})

export const deleteCategory = (id) => ({
  type: DELETE_CATEGORY,
  id,
})

//thunks
export const addNewCategoryThunkerator = (name) => {
  return async (dispatch) => {
    try {
      const newCategory = await axios.post('/api/categories/new-category', {name})
      dispatch(addNewCategory(newCategory.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const deleteCategoryThunkerator = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/categories/${id}`)
      dispatch(deleteCategory(id))
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const getCategoriesFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const allCategories = await axios.get('/api/categories')
      dispatch(getCategoriesFromServer(allCategories.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

export default (prevState = [], action) => {
  switch (action.type) {

    case ADD_NEW_CATEGORY:
      return [...prevState, action.category]

    case GET_ALL_CATEGORIES_FROM_SERVER:
      return action.categories

    case DELETE_CATEGORY:
      return prevState.filter(category => category.id !== action.id)

    default: return prevState;
  }
}
