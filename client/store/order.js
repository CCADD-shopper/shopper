import axios from 'axios'

//Action Types
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const ADD_LINE_ITEM = 'ADD_LINE_ITEM'

//Action Creators
export const getAllItems = (allItems) => ({
  type: GET_ALL_ITEMS,
  allItems,
})

export const addLineItem = (newItem) => ({
  type: ADD_LINE_ITEM,
  newItem,
})

//Thunk Creator
export const getAllItemsThunkerator = (id) => {
  return async (dispatch) => {
    try {
      const allLineItems = await axios.get(`/api/orders/${id}/all-items`)
      dispatch(getAllItems(allLineItems.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//If filter finds no order w/ status = processing, make a new order
export const addLineItemThunkerator = (item) => {
  return async (dispatch) => {
    try {
      const newItem = await axios.post(`/api/orders/add-item`, item)
      dispatch(addLineItem(newItem))
    }
    catch (err){
      console.log(err)
    }
  }
}

//Reducer
const initialState = []

export default (state = initialState, action) => {
  switch (action.type){
    case GET_ALL_ITEMS:
      return action.allItems
    case ADD_LINE_ITEM:
      return state.push(action.newItem)
    default:
      return state
  }
}
