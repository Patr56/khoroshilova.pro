import {EStatus} from "./Enums";

/**
 * Фото.
 *
 * @prop {string} id Идентификатор.
 * @prop {IURLImage} url Ссылки на изображение.
 * @prop {string} name Название фото.
 * @prop {boolean} isCover Является обложкой.
 */
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
    url: IURLImage;
    count: number;
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

export interface IAlbumsBase {
    albums?: IAlbum[];
    photos?: IPhoto[];
}

export interface IAlbumsRs extends IAlbumsBase {
    id: string;
    name: string;
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

export interface IAlbums {
    [id: string]: IData<IAlbumsRs>
}

/**
 * @prop {IAlbums} albums Альбомы.
 */
export interface IStoreAlbums {
    albums: IAlbums;
}

export interface IStoreGallery {
    isOpen: boolean;
    viewPhoto: IViewPhoto;
}

export interface IStore {
    reducerLastAlbums: IStoreLastAlbums;
    reducerGetAlbums: IStoreAlbums;
    reducerGallery: IStoreGallery;
}

export interface IViewPhoto {
    index: number;
    albumId: string;
    photoId: string;
}

/**
 * Параметры в пути.
 */
export interface IPath {
    id: string;
}

/**
 * Статья в блоге.
 * 
 * @prop {string} [id] ID.
 * @prop {string} [title] Заголовок.
 * @prop {number} [datetime] Время публикации.
 * @prop {string} text Текст статьи.
 */
export interface IArticle {
    id?: string,
    title?: string;
    datetime?: number;
    text: string;
}