import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import { userRouter } from './Router/UserRouter';
import { photoRouter } from './Router/PhotoRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use('/photo', photoRouter);

const server = app.listen(3000, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})