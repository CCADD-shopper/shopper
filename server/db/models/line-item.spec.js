/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineItem')
const Order = db.model('order')
const Product = db.model('product')

describe('LineItem model', () => {
  beforeEach(() => {
    return db.sync({force: true})
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
        const lineItem = await LineItem.create({
          orderId: 1,
          productId: 1,
          purchasePrice: 3.33
        })
        expect(lineItem.quantity).to.be.equal(1)
      })
    })
  })
})
