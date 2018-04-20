import axios from 'axios'

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
      dispatch(getCartOrderId(CartOrderId.data.id))
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
