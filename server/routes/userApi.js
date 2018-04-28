import express from 'express';
import { Validate } from '../middleware';
import { UserController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/user', Validate.validateSignUp, UserController.signup);

export default userRouter;
