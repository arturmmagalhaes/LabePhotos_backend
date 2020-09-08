import { BaseDatabase } from "./base/BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "UserLabePhoto";

    public async signUp(data: any) {
        try{
          await super.getConnection().raw(`
            INSERT INTO ${UserDatabase.TABLE_NAME}
            VALUES ("${data.id}", "${data.name}", "${data.email}",
                "${data.nickname}", "${data.password}")
          `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
          super.destroyConnection();
      }
    }

    public async signIn(email: string) {
        try {
          const result = await super.getConnection().raw(`
            SELECT * FROM ${UserDatabase.TABLE_NAME}
            WHERE email = "${email}"
          `);

          return result[0];
        } catch (error) {
            throw new Error(error.message);
        } finally {
          super.destroyConnection();
      }
    }
}