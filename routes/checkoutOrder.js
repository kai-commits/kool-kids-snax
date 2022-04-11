const express = require('express');
const router  = express.Router();
const { timeConfirm } = require('./twilio');

module.exports = (db) => {
  router.post('/', (req, res) => {
    timeConfirm();
  });

  router.post('/submit', (req, res) => {
    db.query(''
    // INSERT INTO orders(user_id, status_id, estimated_time_id, created_at, completed_at, active, price)
    // VALUES (${req.body.user_id}, 1, 1, ${Now()}, ${null}, ${true}, ${req.body.total_price})
    )
    .then(data => {
      const cart_details = data.rows;
      console.log(req.body);
      // console.log(res);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  return router;
};
