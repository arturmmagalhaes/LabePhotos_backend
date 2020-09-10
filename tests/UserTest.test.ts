import { UserBusiness } from "../src/business/UserBusiness";
import { UserDatabase } from "../src/database/UserDatabase";

describe("SignUp", () => {

    let userDatabase = {
        signUp: jest.fn((user: UserDatabase) => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let hashManager = {
        hash: jest.fn(() => "hash")
    }
    let authenticator = {}
    
    test("SignUp - Errors Missing dataController", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "",
                email: "",
                nickname: "",
                password: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignUp - Errors Missing Name", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "",
                email: "name@gmail.com",
                nickname: "name",
                password: "nameee"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignUp - Errors Missing Email", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "name",
                email: "",
                nickname: "name",
                password: "nameee"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignUp - Errors Missing @ Email", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "name",
                email: "namename",
                nickname: "name",
                password: "nameee"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Email");
        }
    });

    test("SignUp - Errors Missing Nickname", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "name",
                email: "name@name.com",
                nickname: "",
                password: "nameee"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignUp - Errors Missing Password", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "name",
                email: "name@name.com",
                nickname: "name",
                password: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignUp - Errors Password < 6 character", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signUp({
                name: "name",
                email: "name@name.com",
                nickname: "name",
                password: "name"
            });

        } catch (error) {
            expect(error.message).toBe("Password Must Contain 6 Characters");
        }
    });

    test("SignUp", async () => {
    });
});

describe("SignIn", () => {

    let userDatabase = {}
    let idGenerate = {}
    let hashManager = {}
    let authenticator = {}
    
    test("SignIn - Errors dataController", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signIn({
                email: "",
                password: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignIn - Errors Missing Email", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signIn({
                email: "",
                password: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });

    test("SignIn - Errors Missing Password", async () => {
        expect.assertions(1);
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerate as any,
                hashManager as any,
                authenticator as any
            );

            await userBusiness.signIn({
                email: "name",
                password: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
        }
    });
});