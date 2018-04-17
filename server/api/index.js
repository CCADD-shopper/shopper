const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

<<<<<<< HEAD
// router.use('/users', require('./products'))
=======
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/categories', require('./categories'))
>>>>>>> master

router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
