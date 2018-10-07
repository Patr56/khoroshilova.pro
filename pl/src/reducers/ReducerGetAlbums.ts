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
    currentAlbumId: null,
    albums: {}
});

export const reducerGetAlbums = (store: IStoreAlbums = initialStore(), action: IAction<any>): IStoreAlbums => {
    console.info(action.type, action.payload);

    switch (action.type) {
        case `${EActions.GET_ALBUMS}_${EStatus.BEGIN}`:
            const currentAlbumId = action.payload as string;
            return {
                ...store,
                currentAlbumId,
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
                currentAlbumId: data.id,
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
            const error: string = action.payload;
            return {
                ...store,
                albums: {
                    ...store.albums,
                    [store.currentAlbumId]: {
                        status: EStatus.FAILURE,
                        data: null,
                        error
                    }
                }
            };
        default:
            return store;
    }
};