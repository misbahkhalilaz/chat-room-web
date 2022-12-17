import React from 'react';
import {AppProps} from 'next/app';
import '../styles/main.scss';
import Head from 'next/head';
import {AppContainer} from 'src/containers/AppContainer/AppContainer';
import {ToastContainer} from 'react-toastify';
import {Provider as NextAuthProvider} from 'next-auth/client';
import {Provider} from 'react-redux';
import {store} from 'src/redux';

let favIconType: 'dark' | 'light';
if (typeof window !== 'undefined') {
    favIconType = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
}

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <NextAuthProvider session={pageProps.session}>
            <Provider store={store}>
                <Head>
                    <link
                        rel="icon"
                        type="image/ico"
                        sizes="32x32"
                        href={`/static/images/favicon-${favIconType}.ico`}
                    />
                </Head>
                <ToastContainer />
                <AppContainer>
                    <Component {...pageProps} />
                </AppContainer>
            </Provider>
        </NextAuthProvider>
    );
};

export default MyApp;
