/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import getConfig from 'next/config';

export const redirectToErrorPage = () => {
    return {
        destination: '/error',
        permanent: false,
    };
};

export const runTimeServerConfig = () => {
    return process.env;
};

export const runTimeSharedConfig = () => {
    const config = getConfig();
    if (typeof window !== 'undefined') {
        const configValues = Object.values(config.publicRuntimeConfig.env) as {APP_URL: string}[];
        const env = configValues.find((conf) =>
            conf.APP_URL.toLowerCase().includes(window.location.host.toLowerCase()),
        );
        return env;
    }

    return config.publicRuntimeConfig.env[runTimeServerConfig().APP_ENV!] || {};
};

export const getFullName = (firstName: string, lastName: string | null) => {
    if (lastName) return `${firstName} ${lastName}`;
    return firstName;
};
