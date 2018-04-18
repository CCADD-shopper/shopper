
const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./review');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
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
  reviewRating: {
    type: Sequelize.INTEGER,
    get () {
      function round (number, precision) {
        var shift = function (number, precision, reverseShift) {
          if (reverseShift) {
            precision = -precision;
          }  
          var numArray = ("" + number).split("e");
          return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
      }

      const reviews = Review.findAll({
        where: {
          productId: this.getDataValue('id'),
        }
      })
      const rating = reviews.reduce((acc, curVal) => {
        return acc + curVal
      }, 0) / reviews.length;

      return round(rating, 1)

    }
  }
})

module.exports = Product;
