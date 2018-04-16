const router = require('express').Router()
const {Product} = require('../db/product')
module.exports = router

router.param('productId', (req, res, next, productId) => {
    Product.findById(productId)
    .then(product => {
        if (!product) res.sendStatus(404);
        req.product = product;
        next();
    })
    .catch(next);
})

router.get('/', (req, res, next) => {
    Product.findAll({})
      .then(users => res.json(users))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    Product.findAll({})
      .then(users => res.json(users))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    req.product.update(req.body)
    .then(product => product.reload(Product))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next);
  })

