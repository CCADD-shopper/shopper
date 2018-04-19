/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import { addProductToCart } from './cart'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
// import history from '../history'
// import User from '../../server/db/models/user'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe.only('Cart store', () => {
  let store
//   let mockAxios

  const initialState = []

  beforeEach(() => {
    // mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    // User.create({
    //     firstName: 'Cody',
    //     lastName: 'Dude',
    //     email: 'cody@puppybook.com',
    //     password: 'bones'
    //   })
    //     .then(user => {
    //       cody = user
    //     })
    // })

  })

  afterEach(() => {
    // mockAxios.restore()
    store.clearActions()
  })

  describe('Add to cart', () => {
    it('adds an item and quantity to the cart', () => {
       store.dispatch(addProductToCart({productID: 24, qty: 4}))
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('ADD_PRODUCT_TO_CART')
          expect(actions[0].product).to.be.an('object')
    })
  })


})
