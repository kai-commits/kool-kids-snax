# Kool-Kids Snax

View the hosted version of this project [here](http://kool-kids-snax.herokuapp.com/users/4). It is best viewed between 900px - 1300px.

Kool-Kids Snax is a full stack web application food ordering app that was built as midterm project at Lighthouse Labs with a small team. It allows the customer to place an order and then hear from the restaurant when the order is being prepared.

This project was developed by [Kai Meikle](https://github.com/kai-commits), [Krismina La](https://github.com/arismink) and [Kevin Lee](https://github.com/Cloud9NB).

* Backend was built using Node.js, Express, EJS, and PostreSQL
* Front-end was built with Bootstrap, Javascript, jQuery, Sass and HTML/CSS
* The Twilio API was used to communicate with the customer and the restaurant

![]()
![]()
![]()


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
