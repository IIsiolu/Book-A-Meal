import express from 'express';
import { Validate, Auth } from '../middleware';
import { MealController } from '../controllers';

const mealRouter = express.Router();

mealRouter.post('/meals', Auth.verifyAdmin, Validate.validatemealInput, MealController.createMeal);
mealRouter.get('/meals',  Auth.verifyAdmin, MealController.allMeals);
mealRouter.put('/meals/:mealId', Auth.verifyAdmin, MealController.editMeal);
mealRouter.delete('/meals/:mealId', Auth.verifyAdmin, MealController.deleteMeal);

export default mealRouter;
