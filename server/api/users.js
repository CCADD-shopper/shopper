const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/',  async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  }
  catch(err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res, next) => {

  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
    res.json(user)
  }
  catch (err) {
    next(err)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(200).json(user)
  }
  catch (err){
    next(err);
  }
})

router.put('/:id/toggle-admin', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
    ///////////////////////returning user?
    user.toggleAdmin()
    res.sendStatus(201)
  }
  catch (err){
    next(err)
  }
})

router.put('/:id/update-password', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
    await user.update({ password: req.body.password })
    res.sendStatus(201)
  }
  catch (err){
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
    user.destroy()
    res.sendStatus(202)
  }
  catch (err){
    next(err)
  }
})
