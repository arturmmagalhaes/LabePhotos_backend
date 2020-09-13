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
exports.PhotoController = void 0;
const PhotoBusiness_1 = require("../business/PhotoBusiness");
const IdGenerate_1 = require("../services/IdGenerate");
const PhotoDatabase_1 = require("../database/PhotoDatabase");
const Authenticator_1 = require("../services/Authenticator");
class PhotoController {
    createPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataController = {
                    title: req.body.title,
                    token: req.headers.authorization,
                    file: req.body.file,
                    collection: req.body.collection,
                    hashtag: req.body.hashtag
                };
                yield PhotoController.photoBusiness.createPhoto(dataController);
                res.status(200).send({
                    message: "Created Photo"
                });
            }
            catch (error) {
                res.status(error.errorCode || 400).send({
                    message: error.message
                });
            }
        });
    }
    readPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataController = {
                    token: req.headers.authorization,
                    id_photo: req.params.id
                };
                const result = yield PhotoController.photoBusiness.readImage(dataController);
                res.status(200).send({
                    message: result
                });
            }
            catch (error) {
                res.status(error.errorCode || 400).send({
                    message: error.message
                });
            }
        });
    }
}
exports.PhotoController = PhotoController;
PhotoController.photoBusiness = new PhotoBusiness_1.PhotoBusiness(new PhotoDatabase_1.PhotoDatabase(), new IdGenerate_1.IdGenerate(), new Authenticator_1.Authenticator());
