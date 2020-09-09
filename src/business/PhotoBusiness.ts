import { IdGenerate } from "../services/IdGenerate";
import { PhotoDatabase } from "../database/PhotoDatabase";
import { Authenticator } from "../services/Authenticator";
import moment from "moment";

export class PhotoBusiness {
    constructor(
        private photoDatabase: PhotoDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async createPhoto(dataController: any) {
        try {
            const dataToken = await this.authenticator.getData(dataController.token);

            const dataBusiness = {
                id: await this.idGenerate.generate(),
                title: dataController.title, 
                id_author: dataToken.id, 
                create_at: moment().format("YYYY-MM-DD"),
                file: dataController.file,
                collection: dataController.collection
            }

            const dataTag = {
                id: await this.idGenerate.generate(),
                hashtag: dataController.hashtag,
                id_photo: dataBusiness.id
            }
            
            await this.photoDatabase.createPhoto(dataBusiness);
            await this.photoDatabase.createTag(dataTag);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}