import { BaseDatabase } from "./base/BaseDatabase";
import { UserModelBase } from "../model/UserModel";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "UserLabePhoto";

    public async signUp(data: UserModelBase): Promise<void> {
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

    public async signIn(email: string): Promise<UserModelBase> {
        try {
          const result = await super.getConnection().raw(`
            SELECT * FROM ${UserDatabase.TABLE_NAME}
            WHERE email = "${email}"
          `);

          const data: UserModelBase = {
            id: result[0][0].id,
            name: result[0][0].name,
            email: result[0][0].email,
            nickname: result[0][0].nickname,
            password: result[0][0].password
          }

          return data;
        } catch (error) {
            throw new Error(error.message);
        } finally {
          super.destroyConnection();
      }
    }
    
}