import {IAction, IData, ILastAlbumsRs, IStoreLastAlbums} from "../Models";
import {EActions, EStatus} from "../Enums";

const initData = (): IData<any> => ({
    status: EStatus.IDLE,
    data: [],
    error: null,
});

const initialStore = (): IStoreLastAlbums => ({
    lastAlbums: initData(),
});

export const reducerLastAlbums = (store: IStoreLastAlbums = initialStore(), action: IAction<any>): IStoreLastAlbums => {

    switch (action.type) {
        case `${EActions.GET_LAST_ALBUMS}_${EStatus.BEGIN}`:
            return {
                ...store,
                lastAlbums: {
                    ...initData(),
                    status: EStatus.BEGIN
                }
            };
        case `${EActions.GET_LAST_ALBUMS}_${EStatus.SUCCESSES}`:
            const lastAlbums = action.payload as ILastAlbumsRs;
            return {
                ...store,
                lastAlbums: {
                    data: lastAlbums.albums,
                    error: null,
                    status: EStatus.SUCCESSES
                }

            };
        case `${EActions.GET_LAST_ALBUMS}_${EStatus.FAILURE}`:
            const error: string = action.payload;
            return {
                ...store,
                lastAlbums: {
                    data: null,
                    error,
                    status: EStatus.FAILURE
                }
            };
        default:
            return store;
    }
};