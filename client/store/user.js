import axios from 'axios'
import history from '../history'
import { getCartOrderIdThunkerator, getCartOrderId, addLineItemThunkerator, getAllItemsThunkerator, clearCart, updateUserFromServer, removeUserFromServer } from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const ADD_UNAUTH_USER = 'ADD_UNAUTH_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
// const addUnauthUser = (user) => ({type: ADD_UNAUTH_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
        if (res.data.id) dispatch(getCartOrderIdThunkerator(res.data.id))
      })
      .catch(err => console.log(err))

export const auth = (user, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, user)
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(getCartOrderIdThunkerator(res.data.id))
        if (res.data.changePasswordFlag) history.push('/change-password')
        else history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const createTempUserThunkerator = (tempUserInfo, cart) => {
  return async (dispatch) => {
    try {
      const tUser = await axios.post('api/users/create', tempUserInfo)
      const CartOrderId = await axios.get(`/api/orders/find/${tUser.data.id}`)
      await dispatch(getCartOrderId(CartOrderId.data.id))
      cart.forEach(async cartItem => {
        await axios.post(`/api/orders/add-item/${CartOrderId.data.id}`, cartItem)
      })
      dispatch(clearCart())
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const toggleAdminThunkerator = (id) => {
  return async (dispatch) => {
    const updatedUser = await axios.put(`/api/users/${id}/toggle-admin`)
    dispatch(updateUserFromServer(updatedUser.data))
  }
}

export const deleteUserThunkerator = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${id}`)
      dispatch(removeUserFromServer(id))
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const editPasswordThunkerator = (id, obj) => {
  return async () => {
    try {
      const answer = await axios.put(`/api/users/${id}/update-password`, obj)
      return answer.data
    }
    catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case GET_ALL_USERS:
    //   return Object.assign({}, state, { users: action.users})
    default:
      return state
  }
}
