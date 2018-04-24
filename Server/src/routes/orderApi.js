import express from 'express';
import { PlaceOrder } from '../controllers/Order';

const orderRouter = express.Router();

// orderRouter.get('/', AllMeals.all);
orderRouter.post('/', PlaceOrder.order);
// orderRouter.put('/:id', UpdateMeal.update);

export default orderRouter;
