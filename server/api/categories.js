const router = require('express').Router()
const { Category, Product } = require('../db/models')

router.get('/', (req, res, next) => {
  Category.findAll({})
    .then(categories => res.json(categories))
    .catch(next);
})

router.get('/product-categories/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      },
      include: [{ all: true }],
    })
    const categories = product.categories.map(category => category.id)
    res.json(categories)
  }
  catch (err) {
    next(err)
  }
})

router.post('/new-category', async (req, res, next) => {
  try {
    console.log(req.body)
    const newCategory = await Category.create(req.body)
    res.json(newCategory)
  }
  catch (err) {
    next(err)
  }

})

router.put('/:categoryId', async (req, res, next) => {
  try {
    const id = req.params.categoryId
    const updatedCategory = await Category.update(req.body, { where: { id }, returning: true })
    if (updatedCategory[0] === 0) {
      const error = new Error('hello')
      error.status = 404;
      throw error
    }
    res.json(updatedCategory[1][0])
  }
  catch (err) {
    console.log('hi')
    next(err)
  }
})

router.delete('/:categoryId', async (req, res, next) => {
  try {
    const catId = req.params.categoryId;
    const deletedCategory = await Category.destroy({ where: { id: catId } })
    res.json(deletedCategory)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
