[![Build Status](https://travis-ci.org/phemonick/Book-A-Meal.svg?branch=dummy-dev)](https://travis-ci.org/phemonick/Book-A-Meal)
[![Coverage Status](https://coveralls.io/repos/github/phemonick/Book-A-Meal/badge.svg?branch=dummy-dev)](https://coveralls.io/github/phemonick/Book-A-Meal?branch=dummy-dev)
## Book-A-Meal
 an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

# Technologies Used
- Front-end: Html and css
- Backend: Node/Express/postgresql using sequelize as ORM
- Libaries: Es6, Babel-CLI, eslint, Mocha/Chai, express, seuelize

##Features
# USERS
1. Users can create an account and log in

2. Authenticated users (customers) should be able to see the menu for a specific day and
select an option out of the menu.
3. Authenticated users (customers) should be able to change their meal choice.


# ADMIN
1. Admin (Caterer) should be able to manage (i.e: add, modify and delete) meal options in
the application. Examples of meal options are: Beef with rice, Beef with fries etc
2. Admin (Caterer) should be able to setup menu for a specific day by selecting from the
meal options available on the system.
3. Admin (Caterer) should be able to see the orders made by the user
4. Admin should be able to see amount of money made by end of day
#To Install 

- Download or clone
- open terminal inside root directory of cloned folder
- type npm install to install the dependencies
- npm start to run the app
- Open your postman and type in the routes
- npm test - to run the test suits on the app

## API End points
- POST /auth/signup     Register a user   
- POST /auth/login      Login a user   
- GET /meals/            Get all the meal options  Only Admin (caterer) should  be able to do this. 
- POST /meals/           Add a meal option  Only Admin (caterer) should  be able to do this. 
- PUT /meals/<mealId>    Update the information of a  meal option 
- DELETE /meals/<mealId>  Remove a meal option  Only Admin(caterer) should  be able to do this. 
- POST/menu/              Setup the menu for the day   Only Admin(caterer) should  be able to do this. 
  
#Licence
- MIT
