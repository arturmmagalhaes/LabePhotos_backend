import { IdGenerate } from "../services/IdGenerate";
import { PhotoDatabase } from "../database/PhotoDatabase";
import { Authenticator } from "../services/Authenticator";
import moment from "moment";
import { PhotoReadImageInput, PhotoReadImageOutput } from "../model/PhotoModel";
import { Console } from "console";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class PhotoBusiness {
    constructor(
        private photoDatabase: PhotoDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async createPhoto(dataController: any): Promise<void> {

            if(!dataController || !dataController.title ||
                !dataController.token || !dataController.file ||
                !dataController.collection){
                    throw new InvalidParameterError("Invalid Entry");
                }

            const dataToken = await this.authenticator.getData(dataController.token);

            const dataBusiness = {
                id: await this.idGenerate.generate(),
                title: dataController.title, 
                id_author: dataToken.id, 
                create_at: moment().format("YYYY-MM-DD"),
                file: dataController.file,
                collection: dataController.collection
            }
            
            const result = this.hashtag(dataController.hashtag);

            const invalidHashtag = result.filter(element => {
                return element[0] !== '#'
            })

            if(invalidHashtag.length > 0){
                throw new InvalidParameterError("Invalid Hashtag");
            }
            
            await this.photoDatabase.createPhoto(dataBusiness);
            
            result.forEach(async (element: string) => {
                const dataTag = {
                    id: await this.idGenerate.generate(),
                    id_photo: dataBusiness.id
                }
        
                await this.photoDatabase.createTag(dataTag, element);
            });
    }

    public async getFeed(dataController: any) {
        if(!dataController){
            throw new InvalidParameterError("Invalid Entry");
        }

        const dataToken = await this.authenticator.getData(dataController.token);

        return await this.photoDatabase.getFeed(dataToken.id);
    }

    public async readImage(dataController: any): Promise<PhotoReadImageOutput> {

            if(!dataController.token || !dataController.id_photo) {
                throw new InvalidParameterError("Invalid Entry");
            }

            const dataToken = await this.authenticator.getData(dataController.token);
            
            const dataBusiness: PhotoReadImageInput = {
                id_user: dataToken.id,
                id_photo: dataController.id_photo
            }

            const result = await this.photoDatabase.readImage(dataBusiness);
            
            return result;
    }

    public hashtag(word: string) {
        return word.split(',');
    }

}