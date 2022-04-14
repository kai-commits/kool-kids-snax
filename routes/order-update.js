const express = require('express');
const { updateOrder, pickUpOrder } = require('../public/scripts/twilio');
const router  = express.Router();


// Populate items from database
module.exports = (db) => {
  router.post("/", (req, res) => {
    let queryStr = `
    UPDATE orders SET status_id = ${req.body.status_id} WHERE id = ${req.body.order_id};
    UPDATE orders SET estimated_time_id = ${req.body.estimated_time_id} WHERE id = ${req.body.order_id};
    `;

    if (req.body.status_id === '5') { // 5 = completed
      queryStr += `
      UPDATE orders SET completed_at = now() WHERE id = ${req.body.order_id};
      UPDATE orders SET active = false WHERE id = ${req.body.order_id};
      `;
    }

    db.query(queryStr)
      .then(() => {
        if (req.body.status_id === '2') { // 2 = received
          updateOrder(req.body.estimated_time_value);
        }
        if (req.body.status_id === '4') { // 4 = ready
          pickUpOrder();
        }
        res.redirect('/');
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
        console.log('Error: ', err);
      });
  });
  return router;
};
