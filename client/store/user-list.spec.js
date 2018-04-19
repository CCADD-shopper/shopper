/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import { getUsersFromServerThunkerator} from './user-list'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import User from '../../server/db/models/user'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators user-list', () => {
  let store
  let mockAxios

  const initialState = {userList: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    User.create({
        firstName: 'Cody',
        lastName: 'Dude',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    //     .then(user => {
    //       cody = user
    //     })
    // })

  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('get all users', () => {
    it('adds all users to state when logged in user is admin', () => {
      mockAxios.onGet('/api/users').replyOnce(200)
      return store.dispatch(getUsersFromServerThunkerator())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_USERS_FROM_SERVER')
          // expect(history.location.pathname).to.be.equal('/login')
        })
    })
  })


})
