import express from 'express';
// import { Validate } from '../middleware';
import { MealController } from '../controllers';

const mealRouter = express.Router();

mealRouter.post('/meals', MealController.createMeal);

export default mealRouter;
