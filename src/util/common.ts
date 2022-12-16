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

export const getServerSideRequest = async <T = AnyObject>(args: ServerSideApiRequest<T>) => {
    const {path, method, data, params} = args;
    const request: ApiRequest<T> = {
        path: `${path}`,
        method,
        isServer: true,
    };
    if (params) request.params = params;
    if (data) request.data = data;
    return request;
};

export const urlConverter = (type: 'email' | 'phoneNumber', url: string) => {
    switch (type) {
        case 'email':
            return `mailto:${url}`;
        case 'phoneNumber':
            return `tel:${url}`;
        default:
            return `${url}`;
    }
};

export const getUserName = (firstName: string, lastName: string | null) => {
    if (lastName) return `${firstName} ${lastName}`;
    return firstName;
};
