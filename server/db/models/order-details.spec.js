/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const OrderDetails = db.model('orderDetails')

describe('Order Details model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create an order', () => {
    beforeEach(() => {
        let order, error
        return Order.create({
          status: 'pending'
        })
          .then(result => {
            order = result
          })
          .catch(err => {
            error = err
          })
      })
    describe('create order details', () => {
      let orderDetails, error

      beforeEach(() => {
        return OrderDetails.create({
            orderId: 1,
            shipAddress1: '123 Fake St',
            shipAddress2: '',
            shipCity: 'Favella',
            shipState: 'BR',
            shipZip: '60608',
            billAddress1: '123 Fake St',
            billAddress2: '',
            billCity: 'Favella',
            billState: 'BR',
            billZip: '60608',
            payCcType: 'VISSA',
            payCcNumber: '12345678',
            payCvcNumber: '999',
            payZip: '60608',
            payExpiry: '12/2019'
        })
          .then(result => {
            orderDetails = result
          })
          .catch(err => {
            error = err
          })
      })

      it('Will not accept card type other than VISA, American Express, Mastercard or Big Joes Credit Hut', () => {
        expect(error.name).to.be.equal('SequelizeDatabaseError')
      })
    })
  })
})
