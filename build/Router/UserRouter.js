"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller.ts/UserController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/signup', new UserController_1.UserController().signUp);
exports.userRouter.post('/signin', new UserController_1.UserController().signIn);
