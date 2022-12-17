import {NextPage} from 'next';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {InputField} from 'src/components/InputField/InputField';
import {loginAction} from 'src/redux/auth/auth.action';
import Link from 'next/link';

const Login: NextPage = () => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<LoginCredentials>();

    const requiredRule = {
        value: true,
        message: 'This field is required.',
    };

    return (
        <form
            className="form-card"
            onSubmit={handleSubmit((formState) => {
                dispatch(loginAction(formState));
            })}>
            <h1>Login</h1>
            <InputField
                {...register('userName', {required: requiredRule})}
                autoFocus={true}
                label="Username"
                isError={!!errors.userName}
                message={errors.userName?.message}
            />
            <InputField
                {...register('password', {required: requiredRule})}
                label="Password"
                isError={!!errors.password}
                message={errors.password?.message}
            />
            <button type="submit">Login</button>
            <Link href="/register">Register?</Link>
        </form>
    );
};

export default Login;
