const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
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

router.get('/find/:userId', async (req, res, next) => {
  try {
    const foundCart = await Order.findOrCreate({
      where: {status: 'pending', userId: req.params.userId},
      defaults: {status: 'pending', userId: req.params.userId}
    })
    res.json(foundCart[0])
  }
  catch (err) {
    next(err)
  }
})

router.post('/new-order', (req, res, next) => {
    Order.create(req.body)
      .then(newOrder => res.json(newOrder))
      .catch(next)
  })

//edit order
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

//add one line item
router.post('/add-item', (req, res, next) => {
  LineItem.create(req.body)
  .then(newItem => res.json(newItem))
  .catch(next)
})

//Get all line items from orderId
router.get('/:orderId/all-items', async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    const allItems = await LineItem.findAll({
      where: {orderId},
    })
    res.json(allItems)
  }
  catch (err) {
    next(err)
  }

})

//edit one item
router.put('/item/edit', async (req, res, next) => {
  const orderId = req.body.orderId
  const productId = req.body.productId
  try {
    const updateLineItem = await LineItem.update({quantity: req.body.quantity},
      {where: {
        orderId,
        productId,
      }, returning: true})
    res.json(updateLineItem[1][0])
  }
  catch (err) {
    next(err)
  }
})

//delete 1 line item
router.delete('/:orderId/remove-item', async (req, res, next) => {
  const orderId = req.params.orderId
  const productId = req.body.productId
  try {
    const deletedRow = await LineItem.destroy({where: {
      orderId,
      productId
    }})
    res.json(deletedRow)
  }
  catch (err) {
    next(err)
  }
})

//Delete entire order
router.delete('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    const deletedRow = await LineItem.destroy({where: {
      orderId
    }})
    await Order.destroy({
      where: {
        id: orderId
      }
    })
    res.json(deletedRow)
  }
  catch (err) {
    next(err)
  }
})
