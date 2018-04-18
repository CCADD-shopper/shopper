const router = require('express').Router()
const {Order} = require('../db/models')
// const {User} = require('../db/models/user')
module.exports = router

router.get('/', (req, res, next) => {
    Order.findAll({})
    .then(allOrders => res.json(allOrders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
    .then(order => res.json(order))
    .catch(next)
})

router.get('/user/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Order.findAll({
        //////  THIS IS PENDING THE MODEL ASSOCIATION DEFINITION   ///////
        where: {userId}
    })
    .then(userOrders => res.json(userOrders))
    .catch(next)
})

router.post('/new-order', (req, res, next) => {
    Order.create(req.body)
      .then(newOrder => res.json(newOrder))
      .catch(next)
  })

  router.put('/:orderId/', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.update(req.body, {
        where: {
            id: orderId
        }, returning: true})
        .then(order => {
          res.json(order[1][0])
        })
        .catch(next)
  })
