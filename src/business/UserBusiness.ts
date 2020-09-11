import { UserDatabase } from "../database/UserDatabase";
import { IdGenerate } from "../services/IdGenerate";
import { HashManager } from "../services/HashManager";
import { Authenticator, AuthenticatorData } from "../services/Authenticator";
import { UserControllerModel, UserControllerSignInModel } from "../model/UserModel";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { BaseError } from "../errors/base/BaseError";

export class UserBusiness {
    
    constructor(
        private userDatabase: UserDatabase,
        private idGenerate: IdGenerate,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ){}

    public async signUp(dataController: UserControllerModel): Promise<void> {

            if(!dataController || !dataController.name ||
               !dataController.email || !dataController.nickname ||
               !dataController.password){
                throw new InvalidParameterError("Invalid Entry");
            }

            this.businessRules({
                email: dataController.email,
                password: dataController.password
            });

            const password = await this.hashManager.hash(dataController.password);

            const dataBusiness = {
                id: this.idGenerate.generate(),
                name: dataController.name,
                email: dataController.email.toLowerCase(),
                nickname: dataController.nickname,
                password: password 
            }

            await this.userDatabase.signUp(dataBusiness);
    }

    public async signIn(dataController: UserControllerSignInModel): Promise<string> {
        try {

            if(!dataController || !dataController.email ||
               !dataController.password) {
                throw new InvalidParameterError("Invalid Entry");
            }

            this.businessRules({
                email: dataController.email,
                password: dataController.password
            });

            const result = await this.userDatabase.signIn(dataController.email);
            
            const password = await this.hashManager.compare(dataController.password, result.password);
            
            if(!password){
                throw new InvalidParameterError("Invalid email or password");
            }

            const dataAuthenticator: AuthenticatorData = {
                id: result.id,
                nickname: result.nickname
            }

            const token = await this.authenticator.generateToken(dataAuthenticator)
            
            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    public businessRules(data: UserControllerSignInModel) {
        if(data.email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid Email");
        }

        if(data.password.length < 6) {
            throw new InvalidParameterError("Password Must Contain 6 Characters")
        }
    }
}