import React from 'react';
import {AppProps} from 'next/app';
import '../styles/main.scss';
import {AppContainer} from 'src/containers/AppContainer/AppContainer';
import {ToastContainer} from 'react-toastify';
import {Provider as NextAuthProvider} from 'next-auth/client';
import {Provider} from 'react-redux';
import {store} from 'src/redux';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <NextAuthProvider session={pageProps.session}>
            <Provider store={store}>
                <AppContainer>
                    <Component {...pageProps} />
                </AppContainer>
                <ToastContainer />
            </Provider>
        </NextAuthProvider>
    );
};

export default MyApp;
