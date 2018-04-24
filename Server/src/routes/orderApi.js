import express from 'express';
import { PlaceOrder, AllOrders, ModifyOrder } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.get('/', AllOrders.getOrder);
orderRouter.post('/', PlaceOrder.order);
orderRouter.put('/:orderId', ModifyOrder.update);

export default orderRouter;
