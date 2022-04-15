/*
  Performs all twilio message creation functions
*/


require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


// Order placed by customer
// SMS will be sent to restaurant notifying it that an order has been placed
const chkoutOrder = () => {
  client.messages
    .create({
      body: 'An order has been placed for Kool-Kids Snax. Please update its status on the admin console.',
      to: process.env.RESTAURANT_PHONE_NUMBER,
      from: process.env.TWILIO_NUMBER,
    })
};

const updateOrder = (time) => {
  client.messages
    .create({
      body: `Your order has been received and will be ready in ${time}.`,
      to: process.env.CUSTOMER_PHONE_NUMBER,
      from: process.env.TWILIO_NUMBER,
    })
};

const pickUpOrder = () => {
  client.messages
    .create({
      body: 'Your order is ready for pick up.',
      to: process.env.CUSTOMER_PHONE_NUMBER,
      from: process.env.TWILIO_NUMBER,
    })
};

module.exports = { chkoutOrder, updateOrder, pickUpOrder };
