import {Method} from 'axios';

declare global {
    interface ClientSIdeRequestOptions<T> {
        method: Method;
        data?: T;
        token?: string;
        params?: AnyObject;
        locale?: string;
    }
}
