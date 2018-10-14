import {IAction, IStoreGallery, IViewPhoto} from "../Models";
import {EActions} from "../Enums";

export const initGallery = (): IStoreGallery  => ({
    isOpen: false,
    viewPhoto: {
        index: null,
        albumId: null,
        photoId: null,
    }
});

/**
 * Редьюсер для работы с галлерей и просмотра фотографий.
 * 
 * @param store 
 * @param action 
 */
export const reducerGallery = (store: IStoreGallery = initGallery(), action: IAction<any>): IStoreGallery => {

    switch (action.type) {
        case EActions.VIEW_PHOTO:
            const viewPhoto = action.payload as IViewPhoto;
            return {
                ...store,
                isOpen: true,
                viewPhoto,
            };
        case EActions.CLOSE_GALLERY:
            return {
                ...store,
                isOpen: false,
            };
        case EActions.GALLERY_NEXT_PHOTO:
            return {
                ...store,
                viewPhoto: {
                    ...store.viewPhoto,
                    index: store.viewPhoto.index + 1,
                }
            };
        case EActions.GALLERY_PREV_PHOTO:
            return {
                ...store,
                viewPhoto: {
                    ...store.viewPhoto,
                    index: store.viewPhoto.index - 1,
                }
            };
        default:
            return store;
    }
};