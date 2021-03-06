import {applyMiddleware, combineReducers, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {reducerLastAlbums} from './reducers/ReducerLastAlbums';
import {reducerGetAlbums} from './reducers/ReducerGetAlbums';
import {reducerGallery} from './reducers/ReducerGallery';
import {getLastAlbums, getAlbums} from "./Sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    reducerLastAlbums,
    reducerGetAlbums,
    reducerGallery,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(getLastAlbums);
sagaMiddleware.run(getAlbums);