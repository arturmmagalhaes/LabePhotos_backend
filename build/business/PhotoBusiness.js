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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoBusiness = void 0;
const moment_1 = __importDefault(require("moment"));
const InvalidParameterError_1 = require("../errors/InvalidParameterError");
class PhotoBusiness {
    constructor(photoDatabase, idGenerate, authenticator) {
        this.photoDatabase = photoDatabase;
        this.idGenerate = idGenerate;
        this.authenticator = authenticator;
    }
    createPhoto(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.title ||
                !dataController.token || !dataController.file ||
                !dataController.collection) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Entry");
            }
            const dataToken = yield this.authenticator.getData(dataController.token);
            const dataBusiness = {
                id: yield this.idGenerate.generate(),
                title: dataController.title,
                id_author: dataToken.id,
                create_at: moment_1.default().format("YYYY-MM-DD"),
                file: dataController.file,
                collection: dataController.collection
            };
            const result = this.hashtag(dataController.hashtag);
            const invalidHashtag = result.filter(element => {
                return element[0] !== '#';
            });
            if (invalidHashtag.length > 0) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Hashtag");
            }
            yield this.photoDatabase.createPhoto(dataBusiness);
            result.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                const dataTag = {
                    id: yield this.idGenerate.generate(),
                    id_photo: dataBusiness.id
                };
                yield this.photoDatabase.createTag(dataTag, element);
            }));
        });
    }
    getFeed(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Entry");
            }
            const dataToken = yield this.authenticator.getData(dataController.token);
            return yield this.photoDatabase.getFeed(dataToken.id);
        });
    }
    readImage(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController.token || !dataController.id_photo) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Entry");
            }
            const dataToken = yield this.authenticator.getData(dataController.token);
            const dataBusiness = {
                id_user: dataToken.id,
                id_photo: dataController.id_photo
            };
            const result = yield this.photoDatabase.readImage(dataBusiness);
            return result;
        });
    }
    hashtag(word) {
        return word.split(',');
    }
}
exports.PhotoBusiness = PhotoBusiness;
