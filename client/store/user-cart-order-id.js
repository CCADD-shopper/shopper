import axios from 'axios'
import { getAllItemsThunkerator, editLineItemThunkerator, addLineItemThunkerator } from './';

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
      const oldCart = await axios.get(`/api/orders/${orderId}/all-items`)
      await handleLocal(dispatch, orderId, oldCart.data)
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

const handleLocal = (dispatch, CartOrderId, oldCart) => {
  if (!localStorage.getItem('cart')) return
  const cart = JSON.parse(localStorage.getItem('cart'))
  cart.map(async (newItem) => {
    newItem.orderId = CartOrderId
    const foundItem = oldCart.filter(item => item.productId === newItem.productId)
    if (foundItem.length){
      newItem.quantity = newItem.quantity + foundItem[0].quantity
      await dispatch(editLineItemThunkerator(newItem))
    }
    else {
      await dispatch(addLineItemThunkerator(newItem))
    }
  })
  localStorage.removeItem('cart')
}
