import { call, put, takeEvery } from 'redux-saga/effects'

import {loadAlbums, loadLastAlbums} from './ServiceAPI';
import {EActions, EStatus} from "./Enums";
import {IAction, IAlbum} from "./Models";

function* fetchLastAlbums() {
    try {
        const data: IAlbum[] = yield call(loadLastAlbums);
        yield put({type: `${EActions.GET_LAST_ALBUMS}_${EStatus.SUCCESSES}`, payload: data});
    } catch (e) {
        yield put({type: `${EActions.GET_LAST_ALBUMS}_${EStatus.FAILURE}`,  payload: e.message});
    }
}

export function* getLastAlbums() {
    yield takeEvery(EActions.GET_LAST_ALBUMS, fetchLastAlbums);
}


function* fetchAlbums(action: IAction<string>) {
    try {
        const data: IAlbum[] = yield call(loadAlbums, action.payload);
        yield put({type: `${EActions.GET_ALBUMS}_${EStatus.SUCCESSES}`, payload: data});
    } catch (e) {
        yield put({type: `${EActions.GET_ALBUMS}_${EStatus.FAILURE}`,  payload: e.message});
    }
}

export function* getAlbums() {
    yield takeEvery(EActions.GET_ALBUMS, fetchAlbums);
}