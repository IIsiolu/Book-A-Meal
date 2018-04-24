import express from 'express';
import { AllMeals, AddMeal, UpdateMeal } from '../controllers/Meals';

const mealRouter = express.Router();

mealRouter.get('/', AllMeals.all);
mealRouter.post('/', AddMeal.add);
mealRouter.put('/:id', UpdateMeal.update);

export default mealRouter;
