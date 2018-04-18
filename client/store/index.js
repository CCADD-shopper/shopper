import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productList from './product-list'
import userList from './user-list'
import orderList from './order-list'

const reducer = combineReducers({
  user,
  productList,
  userList,
  orderList,
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
