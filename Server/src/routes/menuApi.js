import express from 'express';
import { PostMenu } from '../controllers/Menu';

const menuRouter = express.Router();

menuRouter.post('/', PostMenu.today);

export default menuRouter;
