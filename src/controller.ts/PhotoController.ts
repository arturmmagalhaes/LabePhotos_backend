import { PhotoBusiness } from "../business/PhotoBusiness";
import { IdGenerate } from "../services/IdGenerate";
import { PhotoDatabase } from "../database/PhotoDatabase";
import { Request, Response } from 'express';
import { Authenticator } from "../services/Authenticator";

export class PhotoController {

    private static photoBusiness = new PhotoBusiness(
        new PhotoDatabase() as any,
        new IdGenerate() as any,
        new Authenticator() as any
    )

    public async createPhoto(req: Request, res: Response) {
        try {
            const dataController = {
                title: req.body.title, 
                token: req.headers.authorization as string,
                file: req.body.file,
                collection: req.body.collection,
                hashtag: req.body.hashtag
            }

            await PhotoController.photoBusiness.createPhoto(dataController);

            res.status(200).send({
                message: "Created Photo"
            });
        } catch (error) {
            res.status(error.errorCode || 400).send({
                message: error.message
            });
        }
    }

    public async getFeed(req: Request, res: Response){
        try {
            const result = await PhotoController.photoBusiness.getFeed({token: req.headers.authorization});

            res.status(200).send({
                data: result
            });
        } catch (error) {
            res.status(error.errorCode || 400).send({
                message: error.message
            });
        }
    }

    public async readPhoto(req: Request, res: Response) {
        try {
            const dataController = {
                token: req.headers.authorization as string,
                id_photo: req.params.id
            }

            const result = await PhotoController.photoBusiness.readImage(dataController);
            
            res.status(200).send({
                message: result
            });
        } catch (error) {
            res.status(error.errorCode || 400).send({
                message: error.message
            });
        }
    }
}