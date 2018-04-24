const router = require('express').Router()
const { Product, Category, Review, User } = require('../db/models')
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

router.get('/:productId', (req, res, next) => {
  res.json(req.product)
})

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Category }]
  })
    .then(products => { res.json(products) })
    .catch(next)
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    await newProduct.setCategories(req.body.categories)
    res.json(newProduct)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:productId', (req, res, next) => {
  const productId = req.params.productId
  Product.update(req.body, {where: {id: productId}, returning: true})
    .then(updatedProduct => res.json(updatedProduct[1][0]))
    .catch(next);
})

