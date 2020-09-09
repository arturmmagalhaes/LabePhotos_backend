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
            res.status(400).send({
                message: error.message
            });
        }
    }
}