const router = require('express').Router()
const { Category } = require('../db/models')

router.get('/', (req, res, next) => {
    Category.findAll({})
    .then(categories => res.json(categories))
    .catch(next);
})

router.post('/new-category', (req, res, next) => {
    Category.create(req.body)
    .then(newCat => res.json(newCat))
    .catch(next);
})

router.put('/:categoryId', async (req, res, next) => {
  try {
    const id = req.params.categoryId
    const updatedCategory = await Category.update(req.body, {where: {id}, returning: true})
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
      const deletedCategory = await Category.destroy({where: {id: catId}})
      res.json(deletedCategory)
    }
    catch (err){
      next(err)
    }
  })

module.exports = router
