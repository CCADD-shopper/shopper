const router = require('express').Router()
const { Review } = require('../db/models')
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
