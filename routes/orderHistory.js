const express = require('express');
const router  = express.Router();

// Populate order summary for customer
module.exports = (db) => {
  router.get('/order_history', (req, res) => {
    db.query(`
      SELECT
        orders.*, order_details.*, items.*
      FROM orders
      JOIN order_details ON orders.id = order_details.order_id
      JOIN items ON order_details.item_id = items.id
      RETURNING *;
    `)
      .then((data) => {
        console.log(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      })
  });

  return router;
}


