import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {asyncTasksMiddleware, loaderMiddleware} from './loader/loader.middleware';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';

const makeStore = (): ToolkitStore =>
    configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware().concat(asyncTasksMiddleware, loaderMiddleware),
    });

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = makeStore();
