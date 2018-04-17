const router = require('express').Router()
const {Product} = require('../db/models/product')
const {Category} = require('../db/models/category')
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

  router.get('/?name', (req, res, next) => {
    const searchName = req.query.name
    Product.findAll({
        name: searchName
    })
      .then(users => res.json(users))
      .catch(next)
  })

  router.get('/?category', (req, res, next) => {
    const searchCat = req.query.category
    Category.findOne({
        name: searchCat,
    })
    .then(foundCat => Product.findAll({
        category: foundCat.id,
    }))
      .then(prodsByCat => res.send(200).json(prodsByCat))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    Product.create(req.body)
      .then(newProduct => res.send(200).json(newProduct))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    req.product.update(req.body)
    .then(product => product.reload(Product))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next);
  })

