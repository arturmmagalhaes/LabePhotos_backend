export interface PhotoBaseModel {
    id: string,
    title: string,
    id_author: string,
    create_at: string,
    file: string,
    collection: string
}

export interface PhotoReadImageInput {
    id_user: string,
    id_photo: string
}

export interface PhotoReadImageOutput {
    title: string,
    create_at: string, 
    file: string, 
    collection: string, 
    hashtag: string,
    nickname: string
}