/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('rating', () => {
      let order, error

      beforeEach(() => {
        return Order.create({
          status: 'not completed'
        })
          .then(result => {
            order = result
          })
          .catch(err => {
            error = err
          })
      })

      it('Will only accept ENUM values', () => {
        expect(error.name).to.be.equal('SequelizeDatabaseError')
      })
    })
  })
})
