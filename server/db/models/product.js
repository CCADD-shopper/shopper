
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get: function () {
      return this.getDataValue('price') / 100;
    },
    set: function (price) {
      this.setDataValue('price', price * 100);
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  qtyAvailable: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  imgUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Tags_font_awesome.svg',
  },
  numOfReviews: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  reviewTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  averageRating: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return this.getDataValue('reviewTotal') / this.getDataValue('numOfReviews');
    }
  }
})

module.exports = Product;
