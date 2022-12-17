import {createAsyncThunk} from '@reduxjs/toolkit';
import {signIn} from 'next-auth/client';
import {request} from 'src/util/request';
import {API_ROUTES} from 'src/util/constants';
import {toast} from 'react-toastify';

export const registerAction = createAsyncThunk<
    ApiResponse<UserResponse>,
    RegisterUser,
    {
        rejectValue: ErrorResponse<UserResponse>;
    }
>('auth/register', async (payload: RegisterUser, {rejectWithValue}) => {
    const response = await request<RegisterUser, UserResponse>({
        path: API_ROUTES.register,
        method: 'POST',
        data: payload,
        passToken: false,
    });
    if (response.success) {
        signIn('credentials', {
            token: response.success.data.token,
            redirect: true,
            callbackUrl: '/',
        });
    }

    if (response.error) {
        toast(response.error.message, {type: 'error'});
        rejectWithValue(response);
    }
    return response;
});

export const loginAction = createAsyncThunk<
    ApiResponse<UserResponse>,
    LoginCredentials,
    {
        rejectValue: ErrorResponse<UserResponse>;
    }
>('auth/login', async (payload: LoginCredentials, {rejectWithValue}) => {
    const response = await request<LoginCredentials, UserResponse>({
        path: API_ROUTES.login,
        method: 'POST',
        data: payload,
        passToken: false,
    });

    if (response.success) {
        signIn('credentials', {
            token: response.success.data.token,
            redirect: true,
            callbackUrl: '/',
        });
    }

    if (response.error) {
        toast(response.error.message, {type: 'error'});
        rejectWithValue(response);
    }
    return response;
});
