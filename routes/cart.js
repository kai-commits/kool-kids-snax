const express = require('express');
const router  = express.Router();
const { chkoutOrder } = require('../public/scripts/twilio.js');

// Build INSERT INTO order_details queries dynamically based on items in cart
const queryBuilder = (order, orderDetails) => {

  const details = orderDetails.items;

  let queryStr = `
    INSERT INTO order_details (order_id, item_id, quantity)
    VALUES `;

  details.forEach(item => {
    queryStr += `(${order.id}, ${item.id}, ${item.quantity}), `
  })

  queryStr = queryStr.replace(/,\s*$/, ""); // Remove last comma
  queryStr += ';'; // Append semi-colon

  return queryStr
}

// When the user clicks on the checkout button
module.exports = (db) => {
  router.post('/submit', (req, res) => {

    // Create order row. Orders are defaulted to PENDING status and 15 MIN ESTIMATED TIME
    db.query(
      `INSERT INTO orders (user_id, status_id, estimated_time_id, created_at, price)
      VALUES (${req.body.user_id}, 1, 1, 'now()', ${req.body.total_price})
      RETURNING *;`
      )
    .then((order) => {
      return db.query(queryBuilder(order.rows[0], req.body))
    })
    .then(data => {
      console.log('shopping cart', req.body);

      chkoutOrder();
      res.redirect('/');
    })
    .catch(err => {
      // res.status(500).json({ error: err.message });
      console.log(err);
    });
  });

  return router;
};
