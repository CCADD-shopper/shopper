const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = LineItem;
