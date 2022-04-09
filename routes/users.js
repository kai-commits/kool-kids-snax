/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM users WHERE id = ${req.params.id};`)
    .then(data => {
      const user = data.rows[0];
      req.session.user_id = user;
      console.log(req.session);
      res.redirect('/');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
