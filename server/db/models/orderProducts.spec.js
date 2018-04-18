/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderProducts = db.model('orderProducts')
const Order = db.model('order')
const Product = db.model('product')

describe('OrderProducts model', () => {
  beforeEach(() => {
    return db.sync()
  })

  describe('validations', () => {
    describe('rating', () => {

      beforeEach(() => {
        Order.create();
        Product.create({
          name: 'faa',
          price: 30.33,
          description: 'asdlfjasdfkjhdsf',
        });
      })

      it('Default value is 1', async () => {
        const orderProducts = await OrderProducts.create({
          orderId: 1,
          productId: 1,
        })
        expect(orderProducts.quantity).to.be.equal(1)
      })
    })
  })
})
