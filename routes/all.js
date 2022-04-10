const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT orders.user_id, orders.id, items.name, order_details.quantity, items.price, orders.estimated_time_id, orders.status_id
    FROM orders
    JOIN order_details ON orders.id = order_id
    JOIN items ON items.id = item_id
    `)
      .then(data => {
        const all = data.rows;
        res.json({ all });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
