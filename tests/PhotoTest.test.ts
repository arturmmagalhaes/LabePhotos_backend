import { PhotoBusiness } from "../src/business/PhotoBusiness";

describe("createPhoto - Errors", () => {

    let userDatabase = {}
    let idGenerate = {}
    let authenticator = {}

    test("createPhoto - Errors Missing dataController", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.createPhoto({
                title: "",
                token: "",
                file: "",
                collection: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("createPhoto - Errors Missing Title", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.createPhoto({
                title: "",
                token: "token",
                file: "file",
                collection: "collection"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("createPhoto - Errors Missing Token", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.createPhoto({
                title: "title",
                token: "",
                file: "file",
                collection: "collection"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("createPhoto - Errors Missing File", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.createPhoto({
                title: "title",
                token: "token",
                file: "",
                collection: "collection"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("createPhoto - Errors Missing Collection", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.createPhoto({
                title: "title",
                token: "token",
                file: "file",
                collection: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

});

describe("createPhoto", () => {

    let photoDatabase = {
        createPhoto: jest.fn(() => {}),
        createTag: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => {return "id"})
    }
    let authenticator = {
        getData: jest.fn(() => "tokenId")
    }

    test("createPhoto", async () => {

        expect.assertions(3);

        const photoBusiness = new PhotoBusiness(
            photoDatabase as any,
            idGenerate as any,
            authenticator as any
        );

        await photoBusiness.createPhoto({
            title: "title",
            token: "token",
            file: "file",
            collection: "collection",
            hashtag: "#hashtag"
        });

        expect(authenticator.getData).toBeCalled();
        expect(idGenerate.generate).toBeCalled();
        expect(photoDatabase.createPhoto).toBeCalled();
    });
});

describe("ReadImage - Errors", () => {


    let userDatabase = {}
    let idGenerate = {}
    let authenticator = {}

    test("ReadImage - Errors Missing dataController", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.readImage({
                id_user: "",
                id_photo: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("ReadImage - Errors Missing Id_user", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.readImage({
                id_user: "",
                id_photo: "id_photo"
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });

    test("ReadImage - Errors Missing Id_photo", async () => {
        expect.assertions(2);
        try {
            const photoBusiness = new PhotoBusiness(
                userDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await photoBusiness.readImage({
                id_user: "id_user",
                id_photo: ""
            });

        } catch (error) {
            expect(error.message).toBe("Invalid Entry");
            expect(error.errorCode).toBe(422);
        }
    });
});

describe("ReadImage", () => {


    let photoDatabase = {
        readImage: jest.fn(() => {})
    }
    let idGenerate = {}
    let authenticator = {
        getData: jest.fn(() => {return "tokenId"})
    }

    test("ReadImage - Errors Missing dataController", async () => {
        
        expect.assertions(2);

        const photoBusiness = new PhotoBusiness(
            photoDatabase as any,
            idGenerate as any,
            authenticator as any
        );

        await photoBusiness.readImage({
            token: "id_user",
            id_photo: "id_photo"
        });

        expect(authenticator.getData).toBeCalled();
        expect(photoDatabase.readImage).toBeCalled();
    });
})