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
    to: process.env.PHONE_NUMBER,
    from: process.env.TWILIO_NUMBER,
  })
  .then((message) => console.log(message.sid));
};

const updateOrder = (time) => {
  client.messages
  .create({
    body: `An order has been received and your order will be ready in ${time}.`,
    to: process.env.PHONE_NUMBER,
    from: process.env.TWILIO_NUMBER,
  })
  .then((message) => console.log(message.sid));
};

module.exports = { chkoutOrder, updateOrder };
