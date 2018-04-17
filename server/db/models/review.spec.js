/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('rating', () => {
      let review, error

      beforeEach(() => {
        return Review.create({
          description: 'this product is awesome',
          rating: 6
        })
          .then(user => {
            review = user
          })
          .catch(err => {
            error = err
          })
      })

      it('Will not accept rating greater than 5', () => {
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    })
  })
})
