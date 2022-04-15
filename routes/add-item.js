const express = require('express');
const items = require('./items');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    db.query(
      `
      INSERT INTO items (name, description, price, url_thumb_photo, menu_group_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [req.body.name, req.body.desc, Number(req.body.price), req.body.img, req.body.group]
    )
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.log('Error: ', err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

