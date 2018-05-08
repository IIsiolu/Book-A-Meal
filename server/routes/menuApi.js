import express from 'express';
import { Validate, Auth } from '../middleware';
import { MenuController } from '../controllers';

const menuRouter = express.Router();

menuRouter.post('/', Auth.verifyAdmin, Validate.validateMenuInput, MenuController.createMenu);
menuRouter.get('/', Auth.verifyToken, MenuController.getMenu);

export default menuRouter;
