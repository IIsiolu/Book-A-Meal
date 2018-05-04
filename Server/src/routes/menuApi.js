import express from 'express';
import ValidateMeal from '../middleware/validateMeal.js';
import { PostMenu, GetMenu } from '../controllers/Menu';

const menuRouter = express.Router();

menuRouter.post('/', ValidateMeal.checkAdd, PostMenu.today);
menuRouter.get('/', GetMenu.menus)


export default menuRouter;
