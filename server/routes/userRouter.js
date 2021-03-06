import express from 'express';
import { Validate, Auth } from '../middleware';
import { UserController } from '../controllers';

/**
 * @summary functions that have access to the req, res and next middleware
 */
const userRouter = express.Router();

userRouter.post('/auth/signup', Validate.validateSignUp, UserController.signup);
userRouter.post('/auth/login', Validate.validateSignin, UserController.signin);
userRouter.get('/users', Auth.verifyAdmin, UserController.getUsers);

export default userRouter;
