/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from './cart'
import {Provider} from 'react-redux'
import store from '../../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.skip('Cart', () => {
  let cart
  beforeEach(() => {
    cart = render(
      <Provider store={store}><Cart /></Provider>
    )
  })

  it('renders the name in an h5', () => {
    expect(cart.find('h2')).to.be.equal('Shopping Cart')
  })
})
