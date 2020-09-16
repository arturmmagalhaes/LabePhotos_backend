import express from 'express';
import { PhotoController } from '../controller.ts/PhotoController';

export const photoRouter = express.Router();

photoRouter.get('/', new PhotoController().getFeed);
photoRouter.post('/create', new PhotoController().createPhoto);
photoRouter.get('/:id', new PhotoController().readPhoto);