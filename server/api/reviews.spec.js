/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const Product = db.model('product')
const User = db.model('user')

describe('Reviews routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {

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
    it('PUT /api/reviews', () => {
      var updateReview = {description: 'ooo this is bad', rating: 1}
      return request(app)
        .put('/api/reviews/1')
        .send(updateReview)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.description).to.be.equal('ooo this is bad')
          expect(res.body.rating).to.be.equal(1)
        })
    })
    it('POST /api/reviews/', () => {
      var newReview = {description: 'i love it', rating: 5, productId: 1, userId: 1}
      return request(app)
        .post('/api/reviews')
        .send(newReview)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.description).to.be.equal('i love it')
          expect(res.body.id).to.be.equal(2)
          expect(res.body.rating).to.be.equal(5)
        })
    })
    it('GET /api/reviews by Product', () => {
      return request(app)
        .get('/api/reviews/byProduct/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].description).to.be.equal('wow')
          expect(res.body[0].productId).to.be.equal(1)
        })
    })
    it('GET /api/reviews by User', () => {
      return request(app)
        .get('/api/reviews/byUser/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].description).to.be.equal('wow')
          expect(res.body[0].userId).to.be.equal(1)
        })
    })
  }) // end describe('/api/reviews')
}) // end describe('Review routes')
