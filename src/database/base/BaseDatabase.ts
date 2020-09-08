import knex from 'knex';
import Knex from 'knex';

export abstract class BaseDatabase {
    
    private static CONNECTION: Knex | null = null;

    protected getConnection() {
        if (!BaseDatabase.CONNECTION) {
            BaseDatabase.CONNECTION = knex({
                client: 'mysql',
                connection: {
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT) | 3306,
                    database: process.env.DB_DATABASE,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,

                }
            });
        }
        return BaseDatabase.CONNECTION;
    }

    protected async destroyConnection() {
        if(BaseDatabase.CONNECTION){
            BaseDatabase.CONNECTION = null;
        }
    }
}