import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productList from './product-list'
import userList from './user-list'
import selectedProduct from './selected-product'

const reducer = combineReducers({
  user,
  productList,
  userList,
  selectedProduct,
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
export * from './selected-product'
