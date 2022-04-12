const express = require('express');
const router  = express.Router();
const { chkoutOrder } = require('../public/scripts/twilio.js');

// When the user clicks on the checkout button
module.exports = (db) => {
  router.post('/submit', (req, res) => {
    db.query(''
    // INSERT INTO orders (user_id, status_id, estimated_time_id, created_at, completed_at, active, price)
    // VALUES (${req.body.user_id}, 1, 1,${Now()}, ${null}, true, ${req.body.total_price})
    // RETURNING *;
    )
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
