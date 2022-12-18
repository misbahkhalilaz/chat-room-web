import classNames from 'classnames';
import React, {FC, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Message, MessagePayload} from 'src/types/message';
import {getFullName} from 'src/util/common';

interface IProps {
    user: UserData;
    handleSendMessage: (message: MessagePayload) => void;
    selectedChat: Message[];
}

export const ChatThread: FC<IProps> = ({user, handleSendMessage, selectedChat}) => {
    const {
        handleSubmit,
        register,
        resetField,
        formState: {errors},
    } = useForm<{message: string}>();

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [selectedChat.length]);

    const requiredRule = {
        value: true,
        message: 'This field is required.',
    };

    return (
        <div className="chat-thread">
            <h3>{getFullName(user?.firstName, user?.lastName)}</h3>
            <div className="chat-thread__listing">
                <div>
                    {selectedChat?.map((msg, idx) => (
                        <div
                            key={idx}
                            className={classNames('chat-thread__message', {
                                'chat-thread__message--second-person': msg.fromUserName === user.userName,
                            })}>
                            {msg.message}
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </div>
            <form
                onSubmit={handleSubmit((data) => {
                    handleSendMessage({
                        message: data.message,
                        toUserName: user.userName,
                    });
                    resetField('message');
                })}>
                {user && (
                    <>
                        <input
                            {...register('message', {required: requiredRule})}
                            autoFocus={true}
                            placeholder="Write message..."
                        />
                        <button disabled={!!errors.message} type="submit">
                            Send
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};
