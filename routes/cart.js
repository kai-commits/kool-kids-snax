const express = require('express');
const router  = express.Router();
const { chkoutOrder } = require('../public/scripts/twilio.js');


const queryBuilder = (order, orderDetails) => {
  console.log('order', order);
  console.log('details', orderDetails);

  let queryStr = `
    INSERT INTO order_details (${order.id})
  `;

  // for (const item of queryParams.items) {
  //   queryStr += `(${})`;
  // }

  return queryStr
}

// When the user clicks on the checkout button
module.exports = (db) => {
  router.post('/submit', (req, res) => {

    db.query(
      `INSERT INTO orders (user_id, status_id, estimated_time_id, created_at, price)
      VALUES (${req.body.user_id}, 1, 1, 'now()', 4000)
      RETURNING *;`
      )
    .then((order) => {
      return db.query(queryBuilder(order.rows[0], req.body))
    })
    .then(data => {
      console.log('shopping cart', req.body);

      chkoutOrder();
      res.redirect('/');
    })
    .catch(err => {
      // res.status(500).json({ error: err.message });
      console.log(err);
    });
  });

  return router;
};

/*
    // INSERT INTO orders (user_id, status_id, estimated_time_id, created_at, completed_at, active, price)
    // VALUES (${req.body.user_id}, 1, 1,${Now()}, ${null}, true, ${req.body.total_price})
    // RETURNING *;
*/

    // .then((queryStuff) => {
    //   console.log('then stuff', queryStuff);
    //   return db.query(queryBuilder(req.body, queryStuff))
    // })
