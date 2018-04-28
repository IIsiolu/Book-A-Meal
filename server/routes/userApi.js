import express from 'express';
import { Validate } from '../middleware';
import { UserController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/users/signup', Validate.validateSignUp, UserController.signup);
userRouter.post('/users/signin', Validate.validateSignin, UserController.signin);
userRouter.get('/users', UserController.getUsers);

export default userRouter;
