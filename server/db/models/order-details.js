const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderDetails', {
    shipAddress1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shipAddress2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    shipCity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shipState: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shipZip: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billAddress1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billAddress2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    billCity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billState: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billZip: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    payCcType: {
        type: Sequelize.ENUM,
        values: ['VISA', 'American Express', 'Mastercard', 'Big Joes Credit Hut']
    },
    payCcNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        // isCreditCard: true,
    },
    payCvcNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    payZip: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    payExpiry: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = OrderDetails;
