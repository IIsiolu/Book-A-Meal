import express from 'express';
// import { Validate } from '../middleware';
import { MenuController } from '../controllers';

const menuRouter = express.Router();

menuRouter.post('/', MenuController.createMenu);
menuRouter.get('/', MenuController.getMenu);

export default menuRouter;
