import {NextPage} from 'next';
import {Session} from 'next-auth';
import {getSession} from 'next-auth/client';
import React, {useEffect, useState} from 'react';
import {ChatThread} from 'src/components/ChatThread/ChatThread';
import {UsersList} from 'src/components/UsersList/UsersList';
import {API_ROUTES} from 'src/util/constants';
import {request} from 'src/util/request';
import {useSocket} from 'src/hooks/useSocket';
import {Message, MessagePayload} from 'src/types/message';

interface IProps {
    session: Session;
    users: UserData[];
    messages: Message[];
}

const HomePage: NextPage<IProps> = ({users, session, messages}) => {
    const [selectedUser, setSelectedUser] = useState<UserData>(users[0]);
    const [selectedChat, setSelectedChat] = useState(messages);
    const socket = useSocket(session.accessToken!);

    const updateChat = async (userName: string) => {
        const messagesResponse = await request<null, {messages: Message[]}>({
            path: `${API_ROUTES.user}/messages/${userName}`,
        });

        if (messagesResponse.success) {
            setSelectedChat(messagesResponse.success.data.messages);
        }
    };

    useEffect(() => {
        setSelectedChat([]);
        updateChat(selectedUser.userName);
    }, [selectedUser.userName]);

    const handleSendMessage = (message: MessagePayload) => {
        socket?.emit('send-message', message);
        setSelectedChat((prevVal) => {
            const shallowCp = [...prevVal];
            shallowCp.push(message as Message);
            return shallowCp;
        });
    };

    useEffect(() => {
        socket?.on('message', (userName) => {
            updateChat(userName);
            setSelectedUser(users.find((user) => user.userName === userName)!);
        });

        // remove listner on unmount
        return () => {
            socket?.off('message');
        };
    }, [socket]);

    return (
        <div className="home-page">
            <UsersList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <ChatThread user={selectedUser} handleSendMessage={handleSendMessage} selectedChat={selectedChat} />
        </div>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    const session = await getSession(context);
    let users: UserData[] = [];
    let messages: Message[] = [];

    if (!session?.accessToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const usersResponse = await request<null, {users: UserData[]}>({path: API_ROUTES.users}, context);

    if (usersResponse.success) {
        users = usersResponse.success.data.users;

        const messageResponse = await request<null, {messages: Message[]}>(
            {path: `${API_ROUTES.user}/messages/${users[0].userName}`},
            context,
        );

        if (messageResponse.success) {
            messages = messageResponse.success.data.messages;
        }
    }

    return {
        props: {session, users, messages},
    };
};

export default HomePage;
