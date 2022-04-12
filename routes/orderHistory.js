const express = require('express');
const router  = express.Router();

// Populate order summary for customer
module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log(req.session)
    db.query(`
      SELECT
        orders.id as order_id,
        orders.user_id as user_id,
        orders.created_at as created_at,
        orders.completed_at as completed_at,
        orders.active as active,
        orders.price as price,
        statuses.*,
        estimated_times.*
      FROM orders
      JOIN statuses ON orders.status_id = statuses.id
      JOIN estimated_times ON orders.estimated_time_id = estimated_times.id
      WHERE orders.user_id = ${req.session.user.id}
      ;
    `)
      .then((data) => {
        // console.log('data', data.rows);
        // console.log('req session', req.session);
        const order_history = data.rows;
        res.json({ order_history });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      })
  });

  return router;
}

// SELECT
// orders.*, order_details.*, items.*
// FROM orders
// JOIN order_details ON orders.id = order_details.order_id
// JOIN items ON order_details.item_id = items.id
// WHERE orders.user_id = ${req.session.user.id}


