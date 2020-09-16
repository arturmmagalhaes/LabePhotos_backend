"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const InvalidParameterError_1 = require("../errors/InvalidParameterError");
class UserBusiness {
    constructor(userDatabase, idGenerate, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerate = idGenerate;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    signUp(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.name ||
                !dataController.email || !dataController.nickname ||
                !dataController.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Entry");
            }
            this.businessRules({
                email: dataController.email,
                password: dataController.password
            });
            const password = yield this.hashManager.hash(dataController.password);
            const dataBusiness = {
                id: this.idGenerate.generate(),
                name: dataController.name,
                email: dataController.email.toLowerCase(),
                nickname: dataController.nickname,
                password: password
            };
            yield this.userDatabase.signUp(dataBusiness);
        });
    }
    signIn(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.email ||
                !dataController.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Entry");
            }
            this.businessRules({
                email: dataController.email,
                password: dataController.password
            });
            const result = yield this.userDatabase.signIn(dataController.email);
            const password = yield this.hashManager.compare(dataController.password, result.password);
            if (!password) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid email or password");
            }
            const dataAuthenticator = {
                id: result.id,
                nickname: result.nickname
            };
            const token = yield this.authenticator.generateToken(dataAuthenticator);
            const user = {
                name: result.name,
                username: result.nickname,
                email: result.email
            };
            return {
                token,
                user
            };
        });
    }
    businessRules(data) {
        if (data.email.indexOf("@") === -1) {
            throw new InvalidParameterError_1.InvalidParameterError("Invalid Email");
        }
        if (data.password.length < 6) {
            throw new InvalidParameterError_1.InvalidParameterError("Password Must Contain 6 Characters");
        }
    }
}
exports.UserBusiness = UserBusiness;
