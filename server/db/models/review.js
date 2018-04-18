const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  }
})

Review.afterCreate(async(review, options) => {
  const product = await Product.findById(review.productId)
  const stars = review.rating
  product.increment('reviewTotal', {by: stars})
  product.increment('numOfReviews')
})

Review.afterDestroy(async(review, options) => {
  const product = await Product.findById(review.productId)
  const stars = review.rating
  product.decrement('reviewTotal', {by: stars})
  product.decrement('numOfReviews')
})

module.exports = Review;
