import {IAction, IData, ILastAlbumsRs, IStoreAlbums} from "../Models";
import {EActions, EStatus} from "../Enums";

const initData = (): IData<any> => ({
    status: EStatus.IDLE,
    data: [],
    error: null,
});

const initialStore = (): IStoreAlbums => ({
    albums: initData(),
});

export const reducerGetAlbums = (store: IStoreAlbums = initialStore(), action: IAction<any>): IStoreAlbums => {
    console.info(action.type, action.payload);

    switch (action.type) {
        case `${EActions.GET_ALBUMS}_${EStatus.BEGIN}`:
            return {
                ...store,
                albums: {
                    ...initData(),
                    status: EStatus.BEGIN
                }
            };
        case `${EActions.GET_ALBUMS}_${EStatus.SUCCESSES}`:
            const lastAlbums = action.payload as ILastAlbumsRs;
            return {
                ...store,
                albums: {
                    data: lastAlbums.albums,
                    error: null,
                    status: EStatus.SUCCESSES
                }

            };
        case `${EActions.GET_ALBUMS}_${EStatus.FAILURE}`:
            const error: string = action.payload;
            return {
                ...store,
                albums: {
                    data: null,
                    error,
                    status: EStatus.FAILURE
                }
            };
        default:
            return store;
    }
};