const router = require('express').Router()
const { Review, User } = require('../db/models')
module.exports = router

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
    const reviewId = req.params.reviewId;
    const review = await Review.update(req.body, {
      where: {
        id: reviewId
      },
      returning: true,
    });
    res.json(review[1][0])
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
  const id = req.params.reviewId
  try {
    const deletedReview = await Review.destroy({where: {id}})
    if (!deletedReview) {
      const err = new Error('Not Found')
      err.status = 404
      throw err
    }
    res.json(deletedReview)
  }
  catch (err) {
    next(err)
  }
})
