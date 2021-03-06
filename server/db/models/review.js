const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  }
}, {
  hooks: {
    afterCreate: async(review, options) => {
      const product = await Product.findById(review.productId)
      const stars = review.rating
      product.increment('starTotal', {by: stars})
      product.increment('numOfReviews')
    },
    afterDestroy: async (review) => {
      const product = await Product.findById(review.productId)
      const stars = review.rating
      product.decrement('starTotal', {by: stars})
      product.decrement('numOfReviews')
    }
  }
})


module.exports = Review;
