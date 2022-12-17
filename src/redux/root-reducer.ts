import {combineReducers} from '@reduxjs/toolkit';
import {loaderReducer} from './loader/loader.slice';

const rootReducer = combineReducers({
    loader: loaderReducer,
});

export {rootReducer};
