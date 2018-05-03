import express from 'express';
import ValidateMeal from '../middleware/validateMeal';
import { PlaceOrder, AllOrders, ModifyOrder } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.get('/', AllOrders.getOrder);
orderRouter.post('/', ValidateMeal.checkOrder, PlaceOrder.order);
orderRouter.put('/:orderId', ModifyOrder.update);

export default orderRouter;
