import express from 'express';
import { Validate, Auth } from '../middleware';
import { MenuController } from '../controllers';

/**
 * @summary functions that have access to the req, res and next middleware
 */
const menuRouter = express.Router();

menuRouter.post(
  '/', Auth.verifyAdmin, Validate.validateMenuInput,
  MenuController.createMenu,
);

menuRouter.get(
  '/', Auth.verifyToken, Validate.validateDate,
  MenuController.getMenu,
);

export default menuRouter;
