import express from 'express';
import { PlaceOrder, AllOrders } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.get('/', AllOrders.getOrder);
orderRouter.post('/', PlaceOrder.order);
// orderRouter.put('/:id', UpdateMeal.update);

export default orderRouter;
