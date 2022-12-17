import {NextPage} from 'next';
import {Session} from 'next-auth';
import {getSession} from 'next-auth/client';
import React, {useState} from 'react';
import {ChatThread} from 'src/components/ChatThread/ChatThread';
import {UsersList} from 'src/components/UsersList/UsersList';
import {API_ROUTES} from 'src/util/constants';
import {request} from 'src/util/request';

interface IProps {
    session: Session;
    users: UserData[];
}

const HomePage: NextPage<IProps> = ({users}) => {
    const [selectedUser, setSelectedUser] = useState<UserData>(users[0]);
    return (
        <div className="home-page">
            <UsersList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <ChatThread user={selectedUser} />
        </div>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    const session = await getSession(context);
    let users: UserData[] = [];

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
    }

    return {
        props: {session, users},
    };
};

export default HomePage;
