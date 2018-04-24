import express from 'express';
import { PostMenu, GetMenu } from '../controllers/Menu';

const menuRouter = express.Router();

menuRouter.post('/', PostMenu.today);
menuRouter.get('/', GetMenu.menus)


export default menuRouter;
