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
    get: function () {
      return this.getDataValue('price') / 100;
    },
    set: function (price) {
      this.setDataValue('price', price * 100);
    }
  },
})

module.exports = LineItem;
