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
exports.PhotoDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
class PhotoDatabase extends BaseDatabase_1.BaseDatabase {
    createPhoto(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                INSERT INTO ${PhotoDatabase.TABLE_NAME}
                VALUES ("${data.id}", "${data.title}", "${data.id_author}", 
                        "${data.create_at}", "${data.file}", "${data.collection}")
            `);
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
    createTag(data, hashtag) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                INSERT INTO ${PhotoDatabase.TABLE_TAG}
                VALUES ("${data.id}", "${hashtag}", "${data.id_photo}")
            `);
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
    getFeed(id) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield _super.getConnection.call(this).raw(`
                SELECT ${PhotoDatabase.TABLE_NAME}.id, title, id_author, create_at, file, collection, name, email, nickname
                FROM ${PhotoDatabase.TABLE_NAME}
                JOIN ${PhotoDatabase.TABLE_USER} 
                ON ${PhotoDatabase.TABLE_NAME}.id_author = ${PhotoDatabase.TABLE_USER}.id
                WHERE ${PhotoDatabase.TABLE_USER}.id = "${id}"
            `);
                const result = data[0].map((element) => {
                    return {
                        id: element.id,
                        title: element.title,
                        id_author: element.id_author,
                        name_author: element.name,
                        create_at: element.create_at,
                        file: element.file,
                        collection: element.collection
                    };
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    readImage(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.getConnection.call(this).raw(`
                SELECT title, create_at, file, collection, hashtag, nickname FROM ${PhotoDatabase.TABLE_NAME}
                JOIN ${PhotoDatabase.TABLE_TAG}
                ON ${PhotoDatabase.TABLE_NAME}.id = ${PhotoDatabase.TABLE_TAG}.id_photo
                JOIN ${PhotoDatabase.TABLE_USER} 
                ON ${PhotoDatabase.TABLE_NAME}.id_author = ${PhotoDatabase.TABLE_USER}.id
                WHERE ${PhotoDatabase.TABLE_USER}.id = "${data.id_user}" 
                AND ${PhotoDatabase.TABLE_NAME}.id = "${data.id_photo}"
            `);
                const hashtags = result[0].map((element) => {
                    return element.hashtag;
                });
                return {
                    title: result[0][0].title,
                    create_at: result[0][0].create_at,
                    file: result[0][0].file,
                    collection: result[0][0].collection,
                    hashtag: hashtags,
                    nickname: result[0][0].nickname
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
}
exports.PhotoDatabase = PhotoDatabase;
PhotoDatabase.TABLE_NAME = "Photo";
PhotoDatabase.TABLE_TAG = "Tags";
PhotoDatabase.TABLE_USER = "UserLabePhoto";
