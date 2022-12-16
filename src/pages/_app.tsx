import React from 'react';
import {AppProps} from 'next/app';
import '../styles/main.scss';
import Head from 'next/head';
import {AppContainer} from 'src/containers/AppContainer/AppContainer';
import {ToastContainer} from 'react-toastify';

let favIconType: 'dark' | 'light';
if (typeof window !== 'undefined') {
    favIconType = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
}

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <Head>
                <link rel="icon" type="image/ico" sizes="32x32" href={`/static/images/favicon-${favIconType}.ico`} />
            </Head>
            <ToastContainer />
            <AppContainer>
                <Component {...pageProps} />
            </AppContainer>
        </>
    );
};

export default MyApp;
