import express from 'express';
import { Validate, Auth } from '../middleware';
import { OrderController } from '../controllers';

/**
 * @summary functions that have access to the req, res and next middleware
 */
const orderRouter = express.Router();

orderRouter.post(
  '/', Auth.verifyToken, Validate.validateOrder,
  OrderController.createOrder,
);

orderRouter.put(
  '/:orderId', Auth.verify, Validate.updateOrder,
  OrderController.modifyOrder,
);

orderRouter.get('/catererOrders', Auth.verifyAdmin, OrderController.catererOrders);

orderRouter.get('/userOrder', Auth.verifyToken, OrderController.customerOrders);

export default orderRouter;
