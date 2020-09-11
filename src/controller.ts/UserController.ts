import { Request, Response } from 'express';
import { UserDatabase } from "../database/UserDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { IdGenerate } from "../services/IdGenerate";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserController {

    private static USER_BUSINESS = new UserBusiness(
        new UserDatabase() as any,
        new IdGenerate() as any,
        new HashManager() as any,
        new Authenticator() as any
    );

    public async signUp(req: Request, res: Response) {
        try {
            await UserController.USER_BUSINESS.signUp({
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password 
            });

            res.status(200).send({
                message: "Created User"
            });
        } catch (error) {
            res.status(error.errorCode || 400).send({
                message: error.message
            });
        }
    }

    public async signIn(req: Request, res: Response) {
        try {
            const token = await UserController.USER_BUSINESS.signIn({
                email: req.body.email,
                password: req.body.password
            });

            res.status(200).send({token});            
        } catch (error) {
            res.status(error.errorCode || 400).send({
                message: error.message
            });
        }
    }
}