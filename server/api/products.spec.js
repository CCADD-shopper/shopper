/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const Product = db.model('product')
const User = db.model('user')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {

    beforeEach(async() => {
      await User.create({
        firstName: 'Cody',
        lastName: 'Booga',
        email: 'cody@booga.com'
      })

      await Product.create({
        name: 'faa',
        price: 30.33,
        description: 'asdlfjasdfkjhdsf',
      })
      await Review.create({
        description: 'wow',
        rating: 4,
        userId: 1,
        productId: 1,
      })
    })
    it('GET /api/products', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('faa')
          expect(res.body.description).to.be.equal('asdlfjasdfkjhdsf')
        })
    })
    it('GET /api/products', () => {
      return request(app)
        .get('/api/products/1/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].description).to.be.equal('wow')
          expect(res.body[0].productId).to.be.equal(1)
        })
    })
    it('POST /api/products/', () => {
      var newProduct = {name: 'hat2', price: 55.55, description: 'this hat is not warm', qtyAvailable: 5}
      return request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.description).to.be.equal('this hat is not warm')
          expect(res.body.id).to.be.equal(2)
          expect(res.body.price).to.be.equal('55.55')
        })
    })
    it('PUT /api/products/', () => {
      var newProduct = {name: 'hat2', price: 55.55, description: 'this hat is not warm', qtyAvailable: 5}
      return request(app)
        .put('/api/products/1')
        .send(newProduct)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.description).to.be.equal('this hat is not warm')
          expect(res.body.price).to.be.equal('55.55')
        })
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')
