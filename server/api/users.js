const router = require('express').Router()
const {
  User
} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
      .then(user => res.json(user))
      .catch(next);
})

router.post('/create', (req, res, next) => {
  User.create(req.body)
    .then(newUser => {
      res.send(200).json(newUser)
    })
    .catch(next);
})

router.put('/:id/edit', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => user.toggleAdmin())
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
      .then(user => {
        return user.destroy()
      })
      .catch(next);
})
