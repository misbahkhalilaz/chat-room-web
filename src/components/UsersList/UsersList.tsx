import classNames from 'classnames';
import React, {FC} from 'react';
import {getFullName} from 'src/util/common';

interface IProps {
    users: UserData[];
    selectedUser: UserData;
    setSelectedUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UsersList: FC<IProps> = ({users, selectedUser, setSelectedUser}) => {
    return (
        <div className="users-list">
            <h1>People</h1>
            <div className="users-list__listing">
                {users.map((user, idx) => (
                    <button
                        key={idx}
                        className={classNames('users-list__button', {
                            'users-list__button--selected': selectedUser.userName === user.userName,
                        })}
                        onClick={() => setSelectedUser(user)}>
                        <span>{`${getFullName(user.firstName, user.lastName)} (${user.userName})`}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
