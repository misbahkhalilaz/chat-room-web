import {store} from 'src/redux';

declare global {
    declare type AppDispatch = typeof store.dispatch;

    declare type RootState = {
        loader: LoaderState;
    };

    declare interface LoaderState {
        visible: boolean;
        tasks: string[];
    }

}
