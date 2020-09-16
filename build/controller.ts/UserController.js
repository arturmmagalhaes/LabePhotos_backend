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
exports.UserController = void 0;
const UserDatabase_1 = require("../database/UserDatabase");
const UserBusiness_1 = require("../business/UserBusiness");
const IdGenerate_1 = require("../services/IdGenerate");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserController.USER_BUSINESS.signUp({
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password
                });
                res.status(200).send({
                    message: "Created User"
                });
            }
            catch (error) {
                res.status(error.errorCode || 400).send({
                    message: error.message
                });
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserController.USER_BUSINESS.signIn({
                    email: req.body.email,
                    password: req.body.password
                });
                res.status(200).send(data);
            }
            catch (error) {
                res.status(error.errorCode || 400).send({
                    message: error.message
                });
            }
        });
    }
}
exports.UserController = UserController;
UserController.USER_BUSINESS = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new IdGenerate_1.IdGenerate(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
