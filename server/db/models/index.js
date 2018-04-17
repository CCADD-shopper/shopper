const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const OrderProducts = require('./orderProducts')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Order.belongsToMany(Product, { through: OrderProducts })
 Product.belongsToMany(Order, { through: OrderProducts })

 Order.belongsTo(User)

 Review.belongsTo(User)
 Review.belongsTo(Product)

 Product.belongsToMany(Category, { through: 'productCategories'})
 Category.hasMany(Product)

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
  OrderProducts,
}
