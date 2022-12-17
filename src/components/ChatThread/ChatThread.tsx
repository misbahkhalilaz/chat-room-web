import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import {getFullName} from 'src/util/common';

interface IProps {
    user: UserData;
}

export const ChatThread: FC<IProps> = ({user}) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<{message: string}>();

    const requiredRule = {
        value: true,
        message: 'This field is required.',
    };

    return (
        <div className="chat-thread">
            <h3>{getFullName(user.firstName, user.lastName)}</h3>
            <div className="chat-thread__listing"></div>
            <form
                onSubmit={handleSubmit((formState) => {
                    console.log(formState);
                })}>
                <input
                    {...register('message', {required: requiredRule})}
                    autoFocus={true}
                    placeholder="Write message..."
                />
                <button disabled={!!errors.message} type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};
