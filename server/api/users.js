const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.param('userId', async (req, res, next, userId) => {
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

router.get('/:userId', (req, res, next) => {
  res.json(req.user)
})

router.post('/create', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:userId/toggle-admin', async (req, res, next) => {
  const updatedUser = await req.user.update({
    isAdmin: !req.user.isAdmin,
  })
  res.json(updatedUser)
})

router.put('/:userId/update-password', async (req, res, next) => {
  try {
    await req.user.update({ password: req.body.password })
    res.sendStatus(201)
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  const id = req.params.userId
  try {
    const deletedUser = await User.destroy({where: {id}})
    if (!deletedUser) {
      const err = new Error('Not Found')
      err.status = 404
      throw err
    }
    res.json(deletedUser)
  }
  catch (err) {
    next(err)
  }
})
