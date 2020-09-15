import { BaseDatabase } from "./base/BaseDatabase";
import { PhotoBaseModel, PhotoFeedModel, PhotoReadImageInput, PhotoReadImageOutput } from "../model/PhotoModel";
import { TagBaseModel } from "../model/TagModel";

export class PhotoDatabase extends BaseDatabase {

    private static TABLE_NAME = "Photo";
    private static TABLE_TAG = "Tags";
    private static TABLE_USER = "UserLabePhoto"

    public async createPhoto(data: PhotoBaseModel): Promise<void> {
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

    public async createTag(data: any, hashtag: string): Promise<void> {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${PhotoDatabase.TABLE_TAG}
                VALUES ("${data.id}", "${hashtag}", "${data.id_photo}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async getFeed(id: string): Promise<PhotoFeedModel[]> { 
        try {
            const data = await super.getConnection().raw(`
                SELECT * FROM ${PhotoDatabase.TABLE_NAME}
                JOIN ${PhotoDatabase.TABLE_USER} 
                ON ${PhotoDatabase.TABLE_NAME}.id_author = ${PhotoDatabase.TABLE_USER}.id
                WHERE ${PhotoDatabase.TABLE_USER}.id = "${id}"
            `);
            const result = data[0].map((element: any) => {
                return {
                    id: element.id,
                    title: element.title,
                    id_author: element.id_author,
                    name_author: element.name,
                    create_at: element.create_at,
                    file: element.file,
                    collection: element.collection
                }
            });
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async readImage(data: PhotoReadImageInput): Promise<PhotoReadImageOutput> {
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

            const hashtags = result[0].map((element: any) => {
                return element.hashtag
            });

            return {
                title: result[0][0].title,
                create_at: result[0][0].create_at, 
                file: result[0][0].file, 
                collection: result[0][0].collection, 
                hashtag: hashtags,
                nickname: result[0][0].nickname
            };
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}