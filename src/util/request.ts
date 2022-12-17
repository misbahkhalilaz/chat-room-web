import axios, {AxiosResponse, Method} from 'axios';
import {getSession} from 'next-auth/client';
import {GetServerSidePropsContext} from 'next';
import {COMMON_HEADERS} from 'src/util/constants';
import {runTimeSharedConfig} from './common';

const createOptions = async <T>(
    method: Method = 'GET',
    passToken: boolean,
    data?: T,
    token?: string,
    context?: GetServerSidePropsContext,
) => {
    const options: ApiRequest<T> = {
        method,
        headers: {...COMMON_HEADERS},
    };

    if (passToken) {
        let accessToken = token;

        if (!accessToken) {
            const session = await getSession(context);
            accessToken = session?.accessToken;
        }

        if (accessToken) {
            options.headers!.authorization = `Bearer ${accessToken}`;
        }
    }

    if (data) options.data = data;

    return options;
};

const request = async <T, R = AnyObject>(
    args: ApiRequest<T>,
    context?: GetServerSidePropsContext,
): Promise<ApiResponse<R>> => {
    try {
        const {method, data, path, passToken = true, token} = args;
        const options = await createOptions(method, passToken, data, token, context);
        const response: AxiosResponse<ApiResponse> = await axios({
            ...options,
            baseURL: runTimeSharedConfig().BASE_API,
            url: path,
        });

        return response.data as ApiResponse<R>;
    } catch (error) {
        console.log('API Exception::', error);
        return {
            error: {
                code: 500,
                message: 'Something went wrong.',
                data: {},
            },
        } as ApiResponse<R>;
    }
};

export {request};
