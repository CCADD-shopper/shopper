const router = require('express').Router()
const { User, Review } = require('../db/models')
module.exports = router

router.param('/:userId', async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
  catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.user)
})

router.get('/:id/reviews', async (req, res, next) => {
  try {
    const userReviews = await Review.findAll({
      where: {
        userId: req.user.id,
      }
    })
    res.json(userReviews.data)
  }
  catch (err) {
    console.log(err)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(200).json(user)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id/toggle-admin', (req, res, next) => {
  req.user.toggleAdmin()
  res.sendStatus(201)
})

router.put('/:id/update-password', async (req, res, next) => {
  try {
    await req.user.update({ password: req.body.password })
    res.sendStatus(201)
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await req.user.destroy()
    res.sendStatus(202)
  }
  catch (err) {
    next(err)
  }
})
