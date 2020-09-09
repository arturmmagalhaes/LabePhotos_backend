import { BaseDatabase } from "./base/BaseDatabase";
import { PhotoBaseModel } from "../model/PhotoModel";
import { TagBaseModel } from "../model/TagModel";
import { UserDatabase } from "./UserDatabase";

export class PhotoDatabase extends BaseDatabase {

    private static TABLE_NAME = "Photo";
    private static TABLE_TAG = "Tags";
    private static TABLE_USER = "UserLabePhoto"

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

    public async readImage(data: any) {
        try {
            const result = await super.getConnection().raw(`
                SELECT title, create_at, file, collection, hashtag, nickname FROM ${PhotoDatabase.TABLE_NAME}
                JOIN ${PhotoDatabase.TABLE_TAG}
                ON ${PhotoDatabase.TABLE_NAME}.id = ${PhotoDatabase.TABLE_TAG}.id_photo
                JOIN ${PhotoDatabase.TABLE_USER} 
                ON ${PhotoDatabase.TABLE_NAME}.id_author = ${PhotoDatabase.TABLE_USER}.id
                WHERE ${PhotoDatabase.TABLE_USER}.id = "${data.id_user}" 
                AND ${PhotoDatabase.TABLE_NAME}.id = "${data.id_photo}"
            `);
            
            return result[0];
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}