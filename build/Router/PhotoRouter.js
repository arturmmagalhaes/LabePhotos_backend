"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRouter = void 0;
const express_1 = __importDefault(require("express"));
const PhotoController_1 = require("../controller.ts/PhotoController");
exports.photoRouter = express_1.default.Router();
exports.photoRouter.get('/', new PhotoController_1.PhotoController().getFeed);
exports.photoRouter.post('/create', new PhotoController_1.PhotoController().createPhoto);
exports.photoRouter.get('/:id', new PhotoController_1.PhotoController().readPhoto);
