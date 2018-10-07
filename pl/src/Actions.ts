import {IAction} from "./Models";
import {EActions} from "./Enums";

export const getLastAlbums = (): IAction<void> => ({
    type: EActions.GET_LAST_ALBUMS,
    payload: null
});

export const getAlbums = (id?: string): IAction<string> => ({
    type: EActions.GET_ALBUMS,
    payload: id
});