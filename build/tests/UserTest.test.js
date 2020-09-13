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
const UserBusiness_1 = require("../src/business/UserBusiness");
describe("SignUp - Errors", () => {
    let userDatabase = {
        signUp: jest.fn((user) => { })
    };
    let idGenerate = {
        generate: jest.fn(() => { return "id"; })
    };
    let hashManager = {
        hash: jest.fn(() => { return "hash"; })
    };
    let authenticator = {};
    test("SignUp - Errors Missing dataController", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield userBusiness.signUp({
                name: "",
                email: "",
                nickname: "",
                password: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignUp - Errors Missing Name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signUp({
                name: "",
                email: "name@gmail.com",
                nickname: "name",
                password: "nameee"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignUp - Errors Missing Email", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signUp({
                name: "name",
                email: "",
                nickname: "name",
                password: "nameee"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignUp - Errors Missing @ Email", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signUp({
                name: "name",
                email: "namename",
                nickname: "name",
                password: "nameee"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Email");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignUp - Errors Missing Nickname", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signUp({
                name: "name",
                email: "name@name.com",
                nickname: "",
                password: "nameee"
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignUp - Errors Missing Password", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signUp({
                name: "name",
                email: "name@name.com",
                nickname: "name",
                password: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignUp - Errors Password < 6 character", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signUp({
                name: "name",
                email: "name@name.com",
                nickname: "name",
                password: "name"
            });
        }
        catch (error) {
            expect(error.message).toBe("Password Must Contain 6 Characters");
            expect(error.errorCode).toBe(422);
        }
    }));
});
describe("SignUp", () => {
    let userDatabase = {
        signUp: jest.fn(() => { })
    };
    let idGenerate = {
        generate: jest.fn(() => "id")
    };
    let hashManager = {
        hash: jest.fn(() => "hash")
    };
    let authenticator = {};
    test("SignUp", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        yield userBusiness.signUp({
            name: "name",
            email: "name@gmail.com",
            nickname: "name",
            password: "nameee"
        });
        expect(idGenerate.generate).toBeCalled();
        expect(hashManager.hash).toBeCalled();
    }));
});
describe("SignIn - Errors", () => {
    let userDatabase = {};
    let idGenerate = {};
    let hashManager = {};
    let authenticator = {};
    test("SignIn - Errors dataController", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signIn({
                email: "",
                password: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignIn - Errors Missing Email", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signIn({
                email: "",
                password: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
    test("SignIn - Errors Missing Password", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
            yield userBusiness.signIn({
                email: "name",
                password: ""
            });
        }
        catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    }));
});
describe("SignIn", () => {
    let userDatabase = {
        signUp: jest.fn(() => { }),
        signIn: jest.fn(() => {
            return {
                password: "nameee"
            };
        })
    };
    let idGenerate = {
        generate: jest.fn(() => "id")
    };
    let hashManager = {
        compare: jest.fn((password, isPassword) => { return true; })
    };
    let authenticator = {
        generateToken: jest.fn(() => { return "jwt"; })
    };
    test("SignIn", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(3);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        yield userBusiness.signIn({
            email: "name@gmail.com",
            password: "nameee"
        });
        expect(userDatabase.signIn).toBeCalled();
        expect(hashManager.compare("nameee", "nameee")).toBe(true);
        expect(authenticator.generateToken).toBeCalled();
    }));
});
