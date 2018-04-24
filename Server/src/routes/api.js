import express from 'express';
import { AllMeals, AddMeal, UpdateMeal, RemoveMeal } from '../controllers/';

const router = express.Router();

router.get('/meals', AllMeals.all);
router.post('/meals', AddMeal.add);
router.put('/meals/:id', UpdateMeal.update);
router.delete('/meals/:mealId', RemoveMeal.delet)
export default router;