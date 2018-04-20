import axios from 'axios';

//Action Types

const INIT_CART = 'INIT_CART';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const ALTER_CART_ITEM_QUANTITY = 'ALTER_CART_ITEM_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const SAVE_CART_CHANGES = 'SAVE_CART_CHANGES';

  //logged in
  const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
  const ADD_LINE_ITEM = 'ADD_LINE_ITEM'

//ACTION CREATORS
export const initCart = (cartFromDb) => ({
    type: ADD_PRODUCT_TO_CART,
    cartFromDb
})

export const addProductToCart = (cartItem) => ({
    type: ADD_PRODUCT_TO_CART,
    cartItem,
})

export const removeProductfromCart = (id) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    id,
})

export const alterCartQuantity = (qty) => ({
    type: ALTER_CART_ITEM_QUANTITY,
    qty,
})

export const persistCart = (cart) => ({
    type: SAVE_CART_CHANGES,
    cart
})

export const clearCart = () => ({
    type: CLEAR_CART,
})

export const getAllItems = (allItems) => ({
  type: GET_ALL_ITEMS,
  allItems,
})

export const addLineItem = (cartItem) => ({
  type: ADD_LINE_ITEM,
  cartItem,
})

//THUNK CREATOR these need revision

export const initCartThunkerator = () => {
    return async (dispatch) => {
      try {
        const allOrders = await axios.get('/api/orders');
        dispatch(persistCart(allOrders.data));
      }
      catch (err) {
        console.log(err);
      }
    }
  }

export const persistCartThunkerator = () => {
    return async (dispatch) => {
      try {
        const allOrders = await axios.put('/api/orders');
        dispatch(persistCart(allOrders.data));
      }
      catch (err) {
        console.log(err);
      }
    }
  }

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
//REDUCER

const initialState = [];

const addProduct = (state, action) => {
  if (state.filter(cartThing => cartThing.productId === action.cartItem.productId).length){
    let found = state.filter(cartThing => cartThing.productId === action.cartItem.productId)
    found[0].quantity = found[0].quantity + action.cartItem.quantity;
    let existing = state.filter(cartThing => cartThing.productId !== action.cartItem.productId)
    if (existing.length){
      return [...existing, found[0]]}
          else {
              return found
          }
  } else {
      return [...state, action.cartItem]
  }
}

export default (state = initialState, action) => {
    switch (action.type) {

    case INIT_CART:
        return action.cartFromDb;

    case ADD_PRODUCT_TO_CART:
      return addProduct(state, action)

    case REMOVE_PRODUCT_FROM_CART:
        return state.filter(cartItem => cartItem.productId !== action.id)

    case GET_ALL_ITEMS:
        return action.allItems

    case ADD_LINE_ITEM:
        return addProduct(state, action)
    // case ALTER_CART_ITEM_QUANTITY:
    //     return state.map(cartItem => action.)

    case CLEAR_CART:
        return initialState;
    default: return state;
  }
}
