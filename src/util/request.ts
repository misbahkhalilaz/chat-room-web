import axios, {AxiosResponse, Method} from 'axios';
import {getSession} from 'next-auth/client';
import {GetServerSidePropsContext} from 'next';
import {COMMON_HEADERS} from 'src/util/constants';

const createOptions = async <T>(
    method: Method = 'GET',
    passToken: boolean,
    data?: T,
    context?: GetServerSidePropsContext,
) => {
    const options: ApiRequest<T> = {
        method,
        headers: {...COMMON_HEADERS},
    };

    if (passToken) {
        const session = await getSession(context);

        if (session?.accessToken) {
            options.headers!.token = `Bearer ${session.accessToken}`;
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
        const {method, data, path, passToken = true} = args;
        const options = await createOptions(method, passToken, data, context);
        const response: AxiosResponse<ApiResponse> = await axios({
            ...options,
            url: `/request${path}`,
        });

        return response.data as ApiResponse<R>;
    } catch (error) {
        console.log('API Exception::', error);
        return {
            error: {
                code: 500,
                message: 'RESPONSE.DEFAULT.ERROR',
                data: {},
            },
        } as ApiResponse<R>;
    }
};

export {request};
