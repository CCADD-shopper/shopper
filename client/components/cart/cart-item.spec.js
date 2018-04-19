/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartItem from './cart-item'
import {Provider} from 'react-redux'
import store from '../../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartItem', () => {
  let cartItem
  const product = {name: 'hat', price: 3.33}
  beforeEach(() => {
    cartItem = render(
      <Provider store={store}><CartItem product={product} quantity={2} /></Provider>
    )
  })

  it('renders the name in an h5', () => {
    expect(cartItem.find('h5').text()).to.be.equal('hat')
  })
  it('renders the price in an p with class price', () => {
    expect(cartItem.find('p.price').html()).to.be.equal('$3.33')
  })
  it('renders the quantity in a p with class quantity', () => {
    expect(cartItem.find('p.quantity').html()).to.be.equal('Quantity: 2')
  })
})
