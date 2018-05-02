import express from 'express';
import { Validate } from '../middleware';
import { MealController } from '../controllers';

const mealRouter = express.Router();

mealRouter.post('/meals', Validate.validatemealInput, MealController.createMeal);

export default mealRouter;
