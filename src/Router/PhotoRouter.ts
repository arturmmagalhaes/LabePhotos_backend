import express from 'express';
import { PhotoController } from '../controller.ts/PhotoController';

export const photoRouter = express.Router();

photoRouter.post('/create', new PhotoController().createPhoto);
photoRouter.get('/', new PhotoController().readPhoto);