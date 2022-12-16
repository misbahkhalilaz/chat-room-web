import {Dispatch, Action, EnhancedStore} from '@reduxjs/toolkit';
import {Persistor} from 'redux-persist';
declare global {
    declare interface AppStore extends EnhancedStore {
        persistor: Persistor;
    }

    declare interface ActionCreator {
        type: string;
        payload: unknown;
    }

    declare interface WithDispatch {
        dispatch: Dispatch<ActionCreator>;
    }

    declare interface ActionType extends Action<string> {
        payload?: unknown;
    }

    declare interface RootState {
        webApplicationReducer: WebApplicationState;
    }
}
