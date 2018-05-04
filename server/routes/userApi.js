import express from 'express';
import { Validate } from '../middleware';
import { UserController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/auth/signup', Validate.validateSignUp, UserController.signup);
userRouter.post('/auth/login', Validate.validateSignin, UserController.signin);
userRouter.get('/users', UserController.getUsers);

export default userRouter;
