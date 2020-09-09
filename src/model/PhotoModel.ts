import moment from 'moment';

export interface PhotoBaseModel {
    id: string,
    title: string,
    id_author: string,
    create_at: string,
    file: string,
    collection: string
}