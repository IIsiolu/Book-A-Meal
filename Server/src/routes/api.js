import express from 'express';
import { AllMeals } from '../controllers/'
const router = express.Router();

router.get('/meals', AllMeals.all);

export default router;