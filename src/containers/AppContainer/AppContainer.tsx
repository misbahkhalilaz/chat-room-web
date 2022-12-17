import {signOut, useSession} from 'next-auth/client';
import React from 'react';
import {Loader} from 'src/components/Loader/Loader';
import {useLoadingRouter} from 'src/hooks/useLoadingRouter';
import {useAppSelector} from 'src/redux';
import {getFullName} from 'src/util/common';

export const AppContainer: React.FC = ({children}) => {
    const routeLoading = useLoadingRouter();
    const asyncActionLoading = useAppSelector((state) => state.loader.visible);
    const [session] = useSession();

    return (
        <>
            <header className="app-container__header">
                <h1>ChatRoom</h1>
                {session?.user && (
                    <span>
                        <h4>{getFullName(session.user.firstName, session.user.lastName)}</h4>
                        <button onClick={() => signOut({callbackUrl: '/login', redirect: true})}>Logout</button>
                    </span>
                )}
            </header>
            <main className="app-container__body">{children}</main>
            {(routeLoading || asyncActionLoading) && <Loader />}
        </>
    );
};
