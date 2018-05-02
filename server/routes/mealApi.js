import express from 'express';
import { Validate } from '../middleware';
import { MealController } from '../controllers';

const mealRouter = express.Router();

mealRouter.post('/meals', Validate.validatemealInput, MealController.createMeal);
mealRouter.get('/meals', MealController.allMeals);
mealRouter.put('/meal/:mealId', MealController.editMeal);

export default mealRouter;
