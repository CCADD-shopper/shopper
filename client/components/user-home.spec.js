/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.skip('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome name={'Cody'} />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h1').text()).to.be.equal('Welcome to TopShop Cody')
  })
})
