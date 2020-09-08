import dotenv from 'dotenv';
import { UserTable } from './UserTable';

dotenv.config();

const userTable = new UserTable();

async function createTables() {
    await userTable.createTable();
}

createTables(); 