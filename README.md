[![Build Status](https://travis-ci.org/phemonick/Book-A-Meal.svg?branch=develop)](https://travis-ci.org/phemonick/Book-A-Meal)
{<img src="https://coveralls.io/repos/github/phemonick/Book-A-Meal/badge.svg?branch=develop" alt="Coverage Status" />}[https://coveralls.io/github/phemonick/Book-A-Meal?branch=develop]

## Book-A-Meal
 an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

<img width="1440" alt="Hellobooks-screenshot" src="/screenshot/screen.png">
<br />

## Application Features
- Caterer to add a new meal
- Caterer to Modify and update meal
- Caterer to Delete a meal
- Caterer to set menu for a specific day by selecting from the meal options available on the system
- Users can see the menu for a specific day and select an option from the menu
- Caterer can see the details for all the orders
- Authenticated users (customers) should be able to see their order history
- Admin (Caterer) should be able to see order history
- The application should be able to host more than one caterer.

## Technologies Used

### Backend

- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

### Frontend
- [React](https://facebook.github.io/react/) A JavaScript library for building user interfaces.
- [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.
- [Webpack](https://webpack.js.org/) A JavaScript tool for bundling scripts, images, styles and other assets
- [Babel](https://babeljs.io/) A JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## API End points
- POST /auth/signup     Register a user   
- POST /auth/login      Login a user   
- GET /meals/            Get all the meal options  Only Admin (caterer) should  be able to do this. 
- POST /meals/           Add a meal option  Only Admin (caterer) should  be able to do this. 
- PUT /meals/<mealId>    Update the information of a  meal option 
- DELETE /meals/<mealId>  Remove a meal option  Only Admin(caterer) should  be able to do this. 
- POST/menu/              Setup the menu for the day   Only Admin(caterer) should  be able to do this. 
 
## Installation

- Install [NodeJS](http://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org/) on your computer
- Clone this repository 
- Navigate to the project root directoty
- Install all depencies with ```npm install```
- Globally install ```sequelize-cli```
- Using ```sequelize db:migrate``` migrate the database
- Start the server by running ```npm run devserver```

## Testing
- for server `npm test`
- for client run `npm run test:client`

## Contribution

- Fork the repository
- Make your contributions
- Write test cases for your contributions
- Create Pull request against the **develop** branch.

## Book A Meal Documentation is available on

  - [Documentation](https://book-meal.herokuapp.com/api-docs)



## User template is available on

- [Book-A-Meal](https://book-meal.herokuapp.com)

## License and Copyright

&copy; Oluwafemi Adekunle

Licensed under the [MIT License](LICENSE).
