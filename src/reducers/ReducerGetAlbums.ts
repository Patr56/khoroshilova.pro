import {IAction, IAlbumsRs, IData, IStoreAlbums} from "../Models";
import {EActions, EStatus} from "../Enums";

export const initAlbum = (): IData<IAlbumsRs>  => ({
    status: EStatus.IDLE,
    error: null,
    data: {
        id: null,
        name: null,
        albums: [],
        photos: []
    }
});

const initialStore = (): IStoreAlbums => ({
    albums: {}
});

export const reducerGetAlbums = (store: IStoreAlbums = initialStore(), action: IAction<any>): IStoreAlbums => {
    // console.info(action.type, action.payload);

    switch (action.type) {
        case `${EActions.GET_ALBUMS}_${EStatus.BEGIN}`:
            const currentAlbumId = action.payload as string;
            return {
                ...store,
                albums: {
                    ...store.albums,
                    [currentAlbumId]: {
                        ...initAlbum(),
                        status: EStatus.BEGIN,
                    }
                }
            };
        case `${EActions.GET_ALBUMS}_${EStatus.SUCCESSES}`:
            const data = action.payload as IAlbumsRs;

            return {
                ...store,
                albums: {
                    ...store.albums,
                    [data.id]: {
                        status: EStatus.SUCCESSES,
                        error: null,
                        data
                    }
                }
            };
        case `${EActions.GET_ALBUMS}_${EStatus.FAILURE}`:
            const error = action.payload;
            return {
                ...store,
                albums: {
                    ...store.albums,
                    [error.id]: {
                        ...initAlbum(),
                        status: EStatus.FAILURE,
                        error: error.error
                    }
                }
            };
        default:
            return store;
    }
};