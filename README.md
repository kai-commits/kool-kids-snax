# Kool-Kids Snax

View the hosted version of this project [here](http://kool-kids-snax.herokuapp.com/users/4). It is best viewed between 900px - 1300px.

Kool-Kids Snax is a full stack web application food ordering app that was built as midterm project at Lighthouse Labs with a small team. It allows the customer to place an order that notifies the restaurant via SMS who will then update the status of the order, which subsequently notifies the customer of the estimated pick up time. When the restaurant changes the order status to complete, the customer will receive a notice that their order is ready for pick up.

This project was developed by [Kai Meikle](https://github.com/kai-commits), [Krismina La](https://github.com/arismink) and [Kevin Lee](https://github.com/Cloud9NB).

* Backend is built using Node.js, Express, EJS, and PostreSQL
* Front-end is built with Bootstrap, Javascript, jQuery, SASS and HTML/CSS
* The Twilio API is used to communicate with the customer and the restaurant


## Getting Started

To run the following project on your local machine, please follow the steps below.

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information.
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the   db folder to see what gets created and seeded in the SDB
6. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
7. Visit `http://localhost:8080/`


## Final Product

### Customer view
![Customer View](https://github.com/kai-commits/kool-kids-snax/blob/master/docs/readme-preview/Customer%20View.gif)

### Restaurant view
![Admin View](https://github.com/kai-commits/kool-kids-snax/blob/master/docs/readme-preview/Admin%20Order.gif)

### Restaurant - Add new item
![Admin Add Item](https://github.com/kai-commits/kool-kids-snax/blob/master/docs/readme-preview/Admin%20Add%20Item.png)

### Dark Mode
![Customer Dark Mode](https://github.com/kai-commits/kool-kids-snax/blob/master/docs/readme-preview/Customer%20Dark%20Mode.gif)

## Dependencies

- Node v12.22.11 or above
- NPM 6.14.16 or above
- Chalk
- Cookie-Sessions
- dotenv
- EJS
- Express
- Morgan
- pg
- Sass
- Twilio
- Nodemon 
