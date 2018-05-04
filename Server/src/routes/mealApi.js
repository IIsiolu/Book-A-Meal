import express from 'express';
import ValidateMeal from '../middleware/validateMeal.js';
import { AllMeals, AddMeal, UpdateMeal, RemoveMeal } from '../controllers/Meals';

const mealRouter = express.Router();

mealRouter.get('/', AllMeals.all);
mealRouter.post('/', ValidateMeal.checkAdd, AddMeal.add);
mealRouter.put('/:id', UpdateMeal.update);
mealRouter.delete('/:mealId', RemoveMeal.delet)

export default mealRouter;
