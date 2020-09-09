export interface UserModelBase {
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
}

export interface UserControllerModel {
    name: string,
    email: string,
    nickname: string,
    password: string
}

export interface UserControllerSignInModel {
    email: string,
    password: string
}