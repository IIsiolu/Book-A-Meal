import express from 'express';
import {  } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.get('/', AllMeals.all);
orderRouter.post('/', AddMeal.add);
orderRouter.put('/:id', UpdateMeal.update);

export default orderRouter;
