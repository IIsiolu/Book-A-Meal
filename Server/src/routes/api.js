import express from 'express';
import { AllMeals, AddMeal, UpdateMeal } from '../controllers/';

const router = express.Router();

router.get('/meals', AllMeals.all);
router.post('/meals', AddMeal.add);
router.put('/meals/:id', UpdateMeal.update);

export default router;