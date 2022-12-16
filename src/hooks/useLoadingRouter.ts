import {Router} from 'next/router';
import {useEffect, useState} from 'react';

/**
 * Triggers loading event handler on router change.
 */
export const useLoadingRouter = (): boolean => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', () => setIsLoading(true));
        Router.events.on('routeChangeComplete', () => setIsLoading(false));
        return () => {
            Router.events.off('routeChangeStart', () => setIsLoading(true));
            Router.events.off('routeChangeComplete', () => setIsLoading(false));
        };
    }, []);

    return isLoading;
};
