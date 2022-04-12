const express = require('express');
const router  = express.Router();

// Populate items from database
module.exports = (db) => {
  router.post("/", (req, res) => {
    db.query(`
    UPDATE orders SET status_id = ${req.body.status_id} WHERE id = ${req.body.order_id};
    UPDATE orders SET estimated_time_id = ${req.body.estimated_time_id} WHERE id = ${req.body.order_id};
    `)
    .then(() => {
      console.log('updated values: ', req.body);
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
      console.log('error:', err);
    });
  });
  return router;
};
