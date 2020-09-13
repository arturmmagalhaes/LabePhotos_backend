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
const PhotoBusiness_1 = require("../src/business/PhotoBusiness");
describe("createPhoto - Errors", () => {
    let userDatabase = {};
    let idGenerate = {};
    let authenticator = {};
    test("createPhoto - Errors Missing dataController", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.createPhoto({
                title: "",
                token: "",
                file: "",
                collection: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("createPhoto - Errors Missing Title", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.createPhoto({
                title: "",
                token: "token",
                file: "file",
                collection: "collection"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("createPhoto - Errors Missing Token", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.createPhoto({
                title: "title",
                token: "",
                file: "file",
                collection: "collection"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("createPhoto - Errors Missing File", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.createPhoto({
                title: "title",
                token: "token",
                file: "",
                collection: "collection"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("createPhoto - Errors Missing Collection", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.createPhoto({
                title: "title",
                token: "token",
                file: "file",
                collection: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
});
describe("createPhoto", () => {
    let photoDatabase = {
        createPhoto: jest.fn(() => { }),
        createTag: jest.fn(() => { })
    };
    let idGenerate = {
        generate: jest.fn(() => { return "id"; })
    };
    let authenticator = {
        getData: jest.fn(() => "tokenId")
    };
    test("createPhoto", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(3);
        const photoBusiness = new PhotoBusiness_1.PhotoBusiness(photoDatabase, idGenerate, authenticator);
        yield photoBusiness.createPhoto({
            title: "title",
            token: "token",
            file: "file",
            collection: "collection",
            hashtag: "#hashtag"
        });
        expect(authenticator.getData).toBeCalled();
        expect(idGenerate.generate).toBeCalled();
        expect(photoDatabase.createPhoto).toBeCalled();
    }));
});
describe("ReadImage - Errors", () => {
    let userDatabase = {};
    let idGenerate = {};
    let authenticator = {};
    test("ReadImage - Errors Missing dataController", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.readImage({
                id_user: "",
                id_photo: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("ReadImage - Errors Missing Id_user", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.readImage({
                id_user: "",
                id_photo: "id_photo"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("ReadImage - Errors Missing Id_photo", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness_1.PhotoBusiness(userDatabase, idGenerate, authenticator);
            yield photoBusiness.readImage({
                id_user: "id_user",
                id_photo: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
});
describe("ReadImage", () => {
    let photoDatabase = {
        readImage: jest.fn(() => { })
    };
    let idGenerate = {};
    let authenticator = {
        getData: jest.fn(() => { return "tokenId"; })
    };
    test("ReadImage - Errors Missing dataController", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const photoBusiness = new PhotoBusiness_1.PhotoBusiness(photoDatabase, idGenerate, authenticator);
        yield photoBusiness.readImage({
            token: "id_user",
            id_photo: "id_photo"
        });
        expect(authenticator.getData).toBeCalled();
        expect(photoDatabase.readImage).toBeCalled();
    }));
});
