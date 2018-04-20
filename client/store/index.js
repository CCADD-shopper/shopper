import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productList from './product-list'
import userList from './user-list'
import orderList from './order-list'
import selectedProduct from './selected-product'
import allCategories from './all-categories'
import selectedCategories from './selected-categories'
import cart from './cart'
import order from './order'
import searchParam from './search-param'
import reviews from './review'

const reducer = combineReducers({
  user,
  productList,
  userList,
  orderList,
  selectedProduct,
  cart,
  allCategories,
  selectedCategories,
  order,
  searchParam,
  reviews,
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product-list'
export * from './user-list'
export * from './order-list'
export * from './selected-product'
export * from './cart'
export * from './all-categories'
export * from './selected-categories'
export * from './order'
export * from './search-param'
export * from './review'
