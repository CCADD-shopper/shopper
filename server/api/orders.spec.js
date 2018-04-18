import { UserHome } from '../../client/components/user-home';

/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe.only('/api/orders/', () => {

    beforeEach(async() => {
      await User.create({
        firstName: 'Cody',
        lastName: 'Booga',
        email: 'cody@booga.com'
      })
      await Order.create({
        status: 'pending',
        userId: 1,
      })
    })

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].status).to.be.equal('pending')
          expect(res.body[0].userId).to.be.equal(1)
        })
    })
    it('PUT /api/orders', () => {
      var newOrder = {status: 'cancelled'}
      return request(app)
        .put('/api/orders/1')
        .send(newOrder)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.equal('cancelled')
        })
    })
    it('POST /api/orders/new-order', () => {
      var newOrder = {status: 'processing', userId: 1}
      return request(app)
        .post('/api/orders/new-order')
        .send(newOrder)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.equal('processing')
          expect(res.body.id).to.be.equal(2)
        })
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
