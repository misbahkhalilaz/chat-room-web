import {AxiosRequestConfig} from 'axios';
import {IncomingMessage} from 'http';

declare global {
    declare interface RequestParams {
        url: string;
        path: string;
        method: string;
        params?: string;
        body?: BodyInit;
    }

    declare interface ResponseObject {
        code: number;
        data: unknown;
        type: string;
        error: null | {message: string};
    }

    type FetchOptions = RequestInit;

    declare type ResponseParams = Partial<ResponseObject>;

    interface ResponseShape<T = AnyObject> {
        code: number;
        message: string;
        data: T;
    }

    interface SuccessResponse<T = AnyObject> {
        success: ResponseShape<T>;
        error: null;
    }

    interface ErrorResponse<T = AnyObject> {
        error: ResponseShape<T>;
        success?: null;
    }

    type ApiResponse<T = AnyObject> = SuccessResponse<T> | ErrorResponse<T>;

    type AnyObject = Record<string, unknown>;

    interface headers {
        'Accept': string;
        'Content-Type': string;
        'Accept-Language'?: string;
        'token'?: string;
        'authorization'?: string;
    }

    interface ApiRequest<T = AnyObject> extends AxiosRequestConfig {
        path?: string;
        data?: T;
        headers?: headers;
        token?: string;
        params?: AnyObject;
        passToken?: boolean;
    }

    interface ServerSideRequest extends IncomingMessage {
        lng: string;
        query: {
            __nextLocale: string;
        };
    }

    type ServerSideApiRequest<T> = ApiRequest<T> & {context: GetServerSidePropsContext<ParsedUrlQuery>};

    declare module '*.svg' {
        const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
        export default content;
    }

    type AnyObject = Record<string, unknown>;

    declare interface TargetElement extends EventTarget {
        scrollIntoView: (arg?: boolean | ScrollIntoViewOptions | undefined) => void;
    }
}
