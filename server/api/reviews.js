const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.get('/:productId/reviews',  async (req, res, next) => {
  try {
    const prodId = req.params.productId
    const reviews = await Review.findAll({
      where: {
        id: prodId
      }
    })
    res.json(reviews)
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/:userId/reviews',  async (req, res, next) => {
  try {
    const userId = req.params.userId
    const reviews = await Review.findAll({
      where: {
        id: userId
      }
    })
    res.json(reviews)
  }
  catch (err) {
    console.log(err)
  }
})
