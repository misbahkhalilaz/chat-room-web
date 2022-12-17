import {NextPage} from 'next';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {InputField} from 'src/components/InputField/InputField';
import {registerAction} from 'src/redux/auth/auth.action';
import Link from 'next/link';

const RegisterPage: NextPage = () => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<RegisterUser>();

    const requiredRule = {
        value: true,
        message: 'This field is required.',
    };

    return (
        <form
            className="form-card"
            onSubmit={handleSubmit((formState) => {
                dispatch(registerAction(formState));
            })}>
            <h1>Signup</h1>
            <InputField
                {...register('firstName', {required: requiredRule})}
                label="First Name"
                autoFocus={true}
                isError={!!errors.firstName}
                message={errors.firstName?.message}
            />
            <InputField
                {...register('lastName', {required: requiredRule})}
                label="Last Name"
                isError={!!errors.lastName}
                message={errors.lastName?.message}
            />
            <InputField
                {...register('userName', {required: requiredRule})}
                label="Username"
                isError={!!errors.userName}
                message={errors.userName?.message}
            />
            <InputField
                {...register('password', {required: requiredRule})}
                label="Password"
                type="password"
                isError={!!errors.password}
                message={errors.password?.message}
            />
            <button type="submit">Register</button>
            <Link href="/login">Login?</Link>
        </form>
    );
};

export default RegisterPage;
