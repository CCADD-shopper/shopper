const router = require('express').Router()
const { Category } = require('../db/models')

router.get('/', (req, res, next) => {
    Category.findAll({})
    .then(categories => res.json(categories))
    .catch(next);
})

router.post('/new-category', (req, res, next) => {
    Category.create(req.body)
    .then(newCat => res.send(200).json(newCat))
    .catch(next);
})

router.delete('/:id', async (req, res, next) => {
    try {
      const catId = req.params.id;
      const category = await Category.findById(catId)
      category.destroy()
      res.sendStatus(202)
    }
    catch (err){
      next(err)
    }
  })

module.exports = router
