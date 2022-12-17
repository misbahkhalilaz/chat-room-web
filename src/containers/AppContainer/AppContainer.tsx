import React from 'react';
import {Loader} from 'src/components/Loader/Loader';
import {useLoadingRouter} from 'src/hooks/useLoadingRouter';
import {useAppSelector} from 'src/redux';

export const AppContainer: React.FC = ({children}) => {
    const routeLoading = useLoadingRouter();
    const asyncActionLoading = useAppSelector((state) => state.loader.visible);

    return (
        <>
            <header className="app-container__header">
                <h1>ChatRoom</h1>
            </header>
            <main className="app-container__body">{children}</main>
            {(routeLoading || asyncActionLoading) && <Loader />}
        </>
    );
};
