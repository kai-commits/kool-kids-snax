const express = require('express');
const router  = express.Router();
const { timeConfirm } = require('./twilio');

module.exports = (db) => {
  router.post('/', (req, res) => {
    timeConfirm();
  });

  router.post('/submit', (req, res) => {
    db.query(`
    `)
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
