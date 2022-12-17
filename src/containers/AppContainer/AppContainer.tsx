import React from 'react';
import {Loader} from 'src/components/Loader/Loader';
import {useLoadingRouter} from 'src/hooks/useLoadingRouter';
import {useAppSelector} from 'src/redux';

export const AppContainer: React.FC = ({children}) => {
    const routeLoading = useLoadingRouter();
    const asyncActionLoading = useAppSelector((state) => state.loader.visible);

    return (
        <>
            {children}
            {(routeLoading || asyncActionLoading) && <Loader />}
        </>
    );
};
