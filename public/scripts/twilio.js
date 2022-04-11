require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Your Kool-Kids-Snax order has been received and will be ready in 35 minutes',
    to: process.env.PHONE_NUMBER,
    from: process.env.TWILIO_NUMBER,
  })
  .then((message) => console.log(message.sid));
