import express from 'express';
import { Validate, Auth } from '../middleware';
import { MealController } from '../controllers';

const mealRouter = express.Router();

mealRouter.post(
  '/meals', Auth.verifyAdmin, Validate.validatemealInput,
  MealController.createMeal,
);

mealRouter.get('/meals', Auth.verifyAdmin, MealController.allMeals);

mealRouter.get('/meals/caterer', Auth.verifyAdmin, MealController.catererMeals);

mealRouter.put(
  '/meals/:mealId', Auth.verifyAdmin, Validate.validatemealUpdate,
  MealController.editMeal,
);

mealRouter.delete(
  '/meals/:mealId', Auth.verifyAdmin,
  MealController.deleteMeal,
);

export default mealRouter;
