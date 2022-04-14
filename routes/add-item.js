const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log('this', req.body);

    db.query(
      `
      INSERT INTO items (name, description, price, url_thumb_photo, menu_group_id)
      VALUES ('${req.body.name}', '${req.body.desc}', ${Number(req.body.price)}, '${req.body.img}', ${req.body.group})
      RETURNING *;
      `
      )
      .then(() => {
        console.log('added to menu!');
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
        res
        .status(500)
        .json({ error: err.message });
      });
  });

  return router;
};

