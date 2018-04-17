/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderProducts = db.model('orderProducts')

describe('OrderProducts model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('rating', () => {
      let orderProducts, error

      beforeEach(() => {
        return OrderProducts.create()
          .then(result => {
            orderProducts = result
          })
          .catch(err => {
            error = err
          })
      })

      it('Default value is 0', () => {
        expect(orderProducts.quantity).to.be.equal(0)
      })
    })
  })
})
