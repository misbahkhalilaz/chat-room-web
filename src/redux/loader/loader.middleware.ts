import {Dispatch, Middleware} from 'redux';
import {loaderActions} from './loader.slice';

const disabledLoaderActions = [] as string[];

export const asyncTasksMiddleware: Middleware<AnyObject, RootState, Dispatch> = (store) => (next) => (action) => {
    const id = action.meta?.requestId;
    switch (action.meta?.requestStatus) {
        case 'pending': {
            if (disabledLoaderActions.includes(action.type)) return;
            store.dispatch(loaderActions.addTask({id}));
            break;
        }
        case 'fulfilled':
        case 'rejected': {
            store.dispatch(loaderActions.removeTask({id}));
            break;
        }
        default:
            break;
    }
    next(action);
};

export const loaderMiddleware: Middleware<AnyObject, RootState, Dispatch> = (store) => (next) => (action) => {
    const tasks = store.getState().loader.tasks;
    const isLoaderVisible = store.getState().loader.visible;
    if (['pending', 'fulfilled', 'rejected'].includes(action.meta?.requestStatus)) {
        if (tasks.length > 0) {
            !isLoaderVisible && store.dispatch(loaderActions.show());
        } else if (tasks.length === 0) {
            isLoaderVisible && store.dispatch(loaderActions.hide());
        }
    }
    return next(action);
};
