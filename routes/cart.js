const express = require('express');
const router  = express.Router();
const { chkoutOrder } = require('../public/scripts/twilio.js');

// When the user clicks on the checkout button
module.exports = (db) => {
  router.post('/submit', (req, res) => {
    db.query(`
    `)
    .then(data => {
      const cart_details = data.rows;
      console.log('shopping cart', req.body);

      chkoutOrder();
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  return router;
}
