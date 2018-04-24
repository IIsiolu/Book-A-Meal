import express from 'express';
import { AllMeals, AddMeal } from '../controllers/';

const router = express.Router();

router.get('/meals', AllMeals.all);
router.post('/meals', AddMeal.add);

export default router;