import axios from 'axios'
import { getAllItemsThunkerator, addLineItemThunkerator } from './';

//Action types
const GET_CART_ORDER_ID = 'GET_CART_ORDER_ID'

//Action creators

export const getCartOrderId = (id) => ({
  type: GET_CART_ORDER_ID,
  id
})

//Thunk

export const getCartOrderIdThunkerator = (userId) => {
  return async (dispatch) => {
    try {
      const CartOrderId = await axios.get(`/api/orders/find/${userId}`)
      const orderId = CartOrderId.data.id
      dispatch(getCartOrderId(orderId))
      await handleLocal(dispatch, orderId)
      dispatch(getAllItemsThunkerator(orderId))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//Reducer
const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ORDER_ID:
      return action.id
    default:
      return state
  }
}

//Helper Function

const handleLocal = (dispatch, CartOrderId) => {
  if (!localStorage.getItem('cart')) return
  const cart = JSON.parse(localStorage.getItem('cart'))
  cart.map(async (newItem) => {
    newItem.orderId = CartOrderId
    await dispatch(addLineItemThunkerator(newItem))
  })
  localStorage.removeItem('cart')
}
