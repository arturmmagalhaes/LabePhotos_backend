import express from 'express';
import { UserController } from '../controller.ts/UserController';

export const userRouter = express.Router();

userRouter.post('/signup', new UserController().signUp);
userRouter.post('/signin', new UserController().signIn);
