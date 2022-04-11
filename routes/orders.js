const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {
    db.query(`
      SELECT
        order_details.*, items.*
      FROM order_details
      JOIN items ON order_details.item_id = items.id
      WHERE order_id = ${req.params.id};
    `)
    .then(data => {
      const order_details = data.rows;
      res.json( {order_details });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  router.post('/cart', (req, res) => {
    db.query(`
    `)
    .then(data => {
      const cart_details = data.rows;
      console.log(req.body);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
    res.redirect('/users');
  });

  return router;
};
