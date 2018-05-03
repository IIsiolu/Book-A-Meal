import express from 'express';
// import { Validate } from '../middleware';
import { OrderController } from '../controllers';

const orderRouter = express.Router();

orderRouter.post('/', OrderController.createOrder);
orderRouter.put('/:orderId', OrderController.modifyOrder);

export default orderRouter;
