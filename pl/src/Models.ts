/**
 * Фото.
 *
 * @prop {string} id Идентификатор.
 * @prop {IURLImage} url Ссылки на изображение.
 * @prop {string} name Название фото.
 * @prop {boolean} isCover Является обложкой.
 */
import {EStatus} from "./Enums";
import {reducerLastAlbums} from "./reducers/ReducerLastAlbums";
import {reducerGetAlbums} from "./reducers/ReducerGetAlbums";

export interface IPhoto {
    id: string;
    url: IURLImage;
    name: string;
    isCover: boolean;
}

export interface IAlbum {
    id: string;
    name: string;
    photos: IPhoto[];
}

/**
 * Ссылка на фото.
 *
 * @prop {string} original Ссылка на исходное изображение.
 * @prop {string} preview Ссылка на изображение предварительного просмотра.
 */
export interface IURLImage {
    original: string;
    preview: string
}

/**
 * Хлебные крошки для навигации.
 *
 * @prop {string} name Название.
 * @prop {string} path Путь.
 */
export interface IBreadcrumb {
    name: string;
    path: string;
}

export interface IAction<T> {
    type: string;
    payload: T;
}

export interface ILastAlbumsRs {
    albums: IAlbum[];
}

export interface IAlbumsRs {
    albums: IAlbum[];
}

export interface IResponse<T> {
    success: boolean;
    body?: T;
    error?: string;
}

export interface IData<T> {
    status: EStatus,
    data: T;
    error: string;

}

export interface IStoreLastAlbums {
    lastAlbums: IData<IAlbum[]>;
}

export interface IStoreAlbums {
    albums: IData<IAlbum[]>;
}

export interface IStore {
    reducerLastAlbums: IStoreLastAlbums;
    reducerGetAlbums: IStoreAlbums;
}