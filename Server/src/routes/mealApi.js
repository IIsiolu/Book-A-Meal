import express from 'express';
import { AllMeals, AddMeal, UpdateMeal, RemoveMeal } from '../controllers/Meals';

const mealRouter = express.Router();

mealRouter.get('/', AllMeals.all);
mealRouter.post('/', AddMeal.add);
mealRouter.put('/:id', UpdateMeal.update);
mealRouter.delete('/:mealId', RemoveMeal.delet)

export default mealRouter;
