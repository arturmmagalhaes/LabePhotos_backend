import { BaseDatabase } from "./base/BaseDatabase";
import { PhotoBaseModel } from "../model/PhotoModel";
import { TagBaseModel } from "../model/TagModel";

export class PhotoDatabase extends BaseDatabase {

    private static TABLE_NAME = "Photo";
    private static TABLE_TAG = "Tags";

    public async createPhoto(data: PhotoBaseModel) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${PhotoDatabase.TABLE_NAME}
                VALUES ("${data.id}", "${data.title}", "${data.id_author}", 
                        "${data.create_at}", "${data.file}", "${data.collection}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async createTag(data: TagBaseModel) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${PhotoDatabase.TABLE_TAG}
                VALUES ("${data.id}", "${data.hashtag}", "${data.id_photo}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}