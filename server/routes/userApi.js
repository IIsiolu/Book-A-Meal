import express from 'express';
import { UserController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/user', UserController.signup);

export default userRouter;
