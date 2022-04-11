const express = require('express');
const router  = express.Router();
const { timeConfirm } = require('./twilio');

module.exports = (db) => {
  router.post('/', (req, res) => {
    timeConfirm();
  });
  return router;
};
