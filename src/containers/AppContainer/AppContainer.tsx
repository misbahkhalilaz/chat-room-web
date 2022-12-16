import React from 'react';
import {Loader} from 'src/components/Loader/Loader';
import {useLoadingRouter} from 'src/hooks/useLoadingRouter';

export const AppContainer: React.FC = ({children}) => {
    const loading = useLoadingRouter();

    return (
        <>
            {children}
            {loading && <Loader />}
        </>
    );
};
