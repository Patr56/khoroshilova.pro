import {IAction, IViewPhoto} from "./Models";
import {EActions} from "./Enums";

export const getLastAlbums = (): IAction<void> => ({
    type: EActions.GET_LAST_ALBUMS,
    payload: null
});

export const getAlbums = (id?: string): IAction<string> => ({
    type: EActions.GET_ALBUMS,
    payload: id
});

export const viewPhoto = (albumId: string, photoId: string, index: number): IAction<IViewPhoto> => ({
    type: EActions.VIEW_PHOTO,
    payload: {
        albumId,
        photoId,
        index,
    }
});

export const closeGallery = (): IAction<void> => ({
    type: EActions.CLOSE_GALLERY,
    payload: null
});

export const galleryNextPhoto = (): IAction<void> => ({
    type: EActions.GALLERY_NEXT_PHOTO,
    payload: null
});

export const galleryPrevPhoto = (): IAction<void> => ({
    type: EActions.GALLERY_PREV_PHOTO,
    payload: null
});

export const galleryOpen = (): IAction<void> => ({
    type: EActions.GALLERY_PREV_PHOTO,
    payload: null
});