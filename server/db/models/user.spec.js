/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {

      it('returns true if the password is correct', async () => {
        const cody = await User.create({
          firstName: 'Cody',
          lastName: 'Dude',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', async () => {
        const cody = await User.create({
          firstName: 'Cody',
          lastName: 'Dude',
          email: 'lol@lol.com',
          password: 'bones'
        })
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
