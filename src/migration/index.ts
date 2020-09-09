import dotenv from 'dotenv';
import { UserTable } from './UserTable';
import { Photo } from './PhotoTable';

dotenv.config();

const userTable = new UserTable();
const photoTable = new Photo();

async function createTables() {
    await userTable.createTable();
    await photoTable.createTable();
    await photoTable.createTableTag();
}

createTables(); 