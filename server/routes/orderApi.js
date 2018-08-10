import express from 'express';
import { Validate, Auth } from '../middleware';
import { OrderController } from '../controllers';

const orderRouter = express.Router();

orderRouter.post('/', Auth.verifyToken, Validate.validateOrder, OrderController.createOrder);
orderRouter.put('/:orderId', Auth.verifyToken, Validate.updateOrder, OrderController.modifyOrder);
orderRouter.get('/', Auth.verifyAdmin, OrderController.allOrders);
orderRouter.get('/userOrder', Auth.verifyToken, OrderController.cusOrder);

export default orderRouter;
