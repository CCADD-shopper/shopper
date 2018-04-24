/* eslint no-console: 0 */

'use strict';

const nodemailer = require('nodemailer');

let orderedMessage = {
    // recipients
    to: 'Andrew <bz61bi+8599paxujhy4w@sharklasers.com>',

    subject: 'Your Order was Recieved!',

    text: 'Thanks for your order with TopShop!',

};

let shippedMessage = {
    // recipients
    to: 'Andrew <bz61bi+8599paxujhy4w@sharklasers.com>',

    subject: 'Your Order was shipped!',

    text: 'Thanks for shopping with TopShop!',

}

// Generate SMTP service account from ethereal.email
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'TopShopPlopper@gmail.com',
      pass: 'TopShopPloppers1'
  },
  logger: false,
  debug: false
}, {
    // default message fields

    // sender info
    from: 'TopShop Ploppers <TopShopPlopper@gmail.com>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
}
);

const orderedEmail = transporter.sendMail(orderedMessage, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
    }

    console.log('Message sent successfully!')
    console.log(nodemailer.getTestMessageUrl(info))
    transporter.close();
})

module.exports = orderedEmail;
