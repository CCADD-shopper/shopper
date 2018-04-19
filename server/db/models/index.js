const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const LineItem = require('./line-item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Order.belongsToMany(Product, { through: LineItem })
 Product.belongsToMany(Order, { through: LineItem })

 Order.belongsTo(User)

 Review.belongsTo(User)
 Review.belongsTo(Product)

 Product.belongsToMany(Category, { through: 'productCategories'})
 Category.belongsToMany(Product, { through: 'productCategories'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Product,
  Review,
  Order,
  LineItem,
}
