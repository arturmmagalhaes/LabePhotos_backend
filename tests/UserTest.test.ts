import { UserBusiness } from "../src/business/UserBusiness";
import { UserDatabase } from "../src/database/UserDatabase";

describe("SignUp - Errors", () => {

    let userDatabase = {
        signUp: jest.fn((user: UserDatabase) => {})
    }
    let idGenerate = {
        generate: jest.fn(() => { return "id"})
    }
    let hashManager = {
        hash: jest.fn(() => {return "hash"})
    }
    let authenticator = {}
    
    test("SignUp - Errors Missing dataController", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        try {
            
            await userBusiness.signUp({
                name: "",
                email: "",
                nickname: "",
                password: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("SignUp - Errors Missing Name", async () => {
        expect.assertions(2);
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
            expect(error.errorCode).toBe(422);
        }
    });

    test("SignUp - Errors Missing Email", async () => {
        expect.assertions(2);
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
            expect(error.errorCode).toBe(422);
        }
    });

    test("SignUp - Errors Missing @ Email", async () => {
        expect.assertions(2);
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
            expect(error.errorCode).toBe(422);
        }
    });

    test("SignUp - Errors Missing Nickname", async () => {
        expect.assertions(2);
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
            expect(error.errorCode).toBe(422);
        }
    });

    test("SignUp - Errors Missing Password", async () => {
        expect.assertions(2);
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
            expect(error.errorCode).toBe(422);
        }
    });

    test("SignUp - Errors Password < 6 character", async () => {
        expect.assertions(2);
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
            expect(error.errorCode).toBe(422);
        }
    });

});

describe("SignUp", () => {

    let userDatabase = {
        signUp: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let hashManager = {
        hash: jest.fn(() => "hash")
    }
    let authenticator = {}
    
    test("SignUp", async () => {

        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        await userBusiness.signUp({
            name: "name",
            email: "name@gmail.com",
            nickname: "name",
            password: "nameee"
        });

        expect(idGenerate.generate).toBeCalled();
        expect(hashManager.hash).toBeCalled();
    });

});

describe("SignIn - Errors", () => {

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

describe("SignIn", () => {

    let userDatabase = {
        signUp: jest.fn(() => {}),
        signIn: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let hashManager = {
        hash: jest.fn(() => "hash"),
        compare: jest.fn(() => {return true})
    }
    let authenticator = {
        generateToken: jest.fn(() => {return "jwt"})
    }
    
    test.skip("SignIn", async () => {

        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        const result = await userBusiness.signIn({
            email: "name@gmail.com",
            password: "nameee"
        });

        console.log(result);

        expect(hashManager.compare).toBeCalled();
        expect(authenticator.generateToken).toBeCalled();
    });

});
