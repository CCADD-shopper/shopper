
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
  starTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  averageRating: {
    type: Sequelize.VIRTUAL,
    get: function () {
      function round(number, precision) {
        var shift = function (number, precision, reverseShift) {
          if (reverseShift) {
            precision = -precision;
          }
          var numArray = ("" + number).split("e");
          return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
      }
      if (!this.getDataValue('numOfReviews')) return 0;
      return round(this.getDataValue('starTotal') / this.getDataValue('numOfReviews'), 1);
    }
  }
})

module.exports = Product;
