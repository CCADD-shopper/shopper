const router = require('express').Router()
const { Review, User } = require('../db/models')
module.exports = router

router.param('reviewId', async (req, res, next, reviewId) => {
  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      const err = new Error('Review Not Found')
      err.status = 404
      res.sendStatus(404);
      throw err
    }
    req.review = review
    next()
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.json(review)
  }
  catch (err) {
    next(err);
  }
})

router.put('/:reviewId', async (req, res, next) => {
  try {
    const updatedReview = await req.review.update(req.body)
    res.json(updatedReview)
  }
  catch (err) {
    next(err);
  }
})

router.get('/byProduct/:productId/', async (req, res, next) => {
  try {
    const productReviews = await Review.findAll({
      where: {
        productId: req.params.productId,
      },
      include: [{ model: User }],
    })
    res.json(productReviews)
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/byUser/:userId/', async (req, res, next) => {
  try {
    const userReviews = await Review.findAll({
      where: {
        userId: req.params.userId,
      }
    })
    res.json(userReviews)
  }
  catch (err) {
    console.log(err)
  }
})

router.delete('/:reviewId', async (req, res, next) => {
  try {
    const destroyedRev = await req.review.destroy();
    res.json(destroyedRev)
  }
  catch (err) {
    next(err)
  }
})
