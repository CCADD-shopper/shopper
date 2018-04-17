const router = require('express').Router()
const {Order} = require('../db/models/order')
// const {User} = require('../db/models/user')
module.exports = router

router.get('/', (req, res, next) => {
    Order.findAll({})
    .then(allOrders => res.send(200).json(allOrders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.productId;
    Order.findById(orderId)
    .then(order => res.send(200).json(order))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Order.findAll({
        //////  THIS IS PENDING THE MODEL ASSOCIATION DEFINITION   ///////
        userId: userId,
    })
    .then(userOrders => res.send(200).json(userOrders))
    .catch(next)
})

router.post('/new-order', (req, res, next) => {
    Order.create(req.body)
      .then(newOrder => res.send(200).json(newOrder))
      .catch(next)
  })

  router.put('/:oderId/', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.update(req.body, {
        where: {
            id: orderId
        }})
        .then(order => Order.findById(order.id))
        .then(updatedOrder => res.send(200).json(updatedOrder))
        .catch(next)
  })
