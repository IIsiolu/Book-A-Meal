import express from 'express';
// import { Validate } from '../middleware';
import { OrderController } from '../controllers';

const orderRouter = express.Router();

orderRouter.post('/', OrderController.createOrder);
orderRouter.put('/:orderId', OrderController.modifyOrder);
orderRouter.get('/', OrderController.allOrders);

export default orderRouter;
