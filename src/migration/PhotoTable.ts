import { BaseDatabase } from "../database/base/BaseDatabase";

export class Photo extends BaseDatabase{

    private static TABLE_NAME = "Photo";

    public async createTable() {
        try {
          await super.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS ${Photo.TABLE_NAME} (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255),
                id_author VARCHAR(255) NOT NULL,
                create_at DATE NOT NULL,
                file VARCHAR(255) NOT NULL,
                collection VARCHAR(255) NOT NULL,
                FOREIGN KEY (id_author) REFERENCES UserLabePhoto(id)
            )
        `);
        } catch(error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async createTableTag() {
        try{
          await super.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS Tags (
                id VARCHAR(255) PRIMARY KEY,
                hashtag VARCHAR(255) NOT NULL,
                id_photo VARCHAR(255) NOT NULL,
                FOREIGN KEY (id_photo) REFERENCES Photo(id)
            )
          `);
        } catch(error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}