import { UserDatabase } from "../database/UserDatabase";
import { IdGenerate } from "../services/IdGenerate";
import { HashManager } from "../services/HashManager";
import { Authenticator, AuthenticatorData } from "../services/Authenticator";

export class UserBusiness {
    
    constructor(
        private userDatabase: UserDatabase,
        private idGenerate: IdGenerate,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ){}

    public async signUp(dataController: any) {
        try {

            if(!dataController || !dataController.name ||
               !dataController.email || !dataController.nickname ||
               !dataController.password){
                throw new Error ("Invalid Entry");
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

        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async signIn(dataController: any): Promise<string> {
        try {

            if(!dataController || !dataController.email ||
               !dataController.password) {
                throw new Error("Invalid Entry");
            }

            this.businessRules({
                email: dataController.email,
                password: dataController.password
            });

            const result = await this.userDatabase.signIn(dataController.email);
            
            const password = await this.hashManager.compare(dataController.password, result[0].password);
            
            if(!password){
                throw new Error("Invalid email or password");
            }

            const dataAuthenticator: AuthenticatorData = {
                id: result[0].id,
                nickname: result[0].nickname
            }

            const token = await this.authenticator.generateToken(dataAuthenticator)
            
            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    public businessRules(data: any) {
        if(data.email.indexOf("@") === -1) {
            throw new Error("Invalid Email");
        }

        if(data.password.length < 6) {
            throw new Error("Password Must Contain 6 Characters")
        }
    }
}