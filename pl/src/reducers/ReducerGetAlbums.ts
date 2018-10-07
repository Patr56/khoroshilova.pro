import {IAction, IAlbumsRs, IData, IStoreAlbums} from "../Models";
import {EActions, EStatus} from "../Enums";

const initialStore = (): IData<IAlbumsRs> => ({
    status: EStatus.IDLE,
    data: {
        albums: [],
        photos: [],
    },
    error: null,
});

export const reducerGetAlbums = (store: IStoreAlbums = initialStore(), action: IAction<any>): IStoreAlbums => {
    console.info(action.type, action.payload);

    switch (action.type) {
        case `${EActions.GET_ALBUMS}_${EStatus.BEGIN}`:
            return {
                ...initialStore(),
                status: EStatus.BEGIN
            };
        case `${EActions.GET_ALBUMS}_${EStatus.SUCCESSES}`:
            const data = action.payload as IAlbumsRs;
            return {
                ...store,
                data: {...data},
                error: null,
                status: EStatus.SUCCESSES

            };
        case `${EActions.GET_ALBUMS}_${EStatus.FAILURE}`:
            const error: string = action.payload;
            return {
                ...store,
                data: null,
                error,
                status: EStatus.FAILURE
            };
        default:
            return store;
    }
};