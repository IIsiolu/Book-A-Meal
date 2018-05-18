import express from 'express';
import { Validate, Auth } from '../middleware';
import { MenuController } from '../controllers';

const menuRouter = express.Router();

// menuRouter.post('/', Auth.verifyAdmin, Validate.validateMenuInput, MenuController.createMenu);
menuRouter.post('/', Auth.verifyAdmin, Validate.validateMenuInput, MenuController.testMenu);
menuRouter.get('/', Auth.verifyToken, Validate.validateDate, MenuController.getMenu);

export default menuRouter;
