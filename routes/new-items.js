const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/add-item", (req, res) => {
    db.query(
      `INSERT INTO items (name, description, price, url_thumb_photo, menu_group_id)
      VALUES ($1, $2, $3, $4, $5,)
      RETURNING *;`, ??????? )
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
      res.redirect('/');
  });
  return router;
};
