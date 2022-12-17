declare interface UserData {
    userName: string;
    firstName: string;
    lastName: string;
    isOnline: boolean;
}

declare interface UserResponse {
    user: UserData;
    token: string;
}

interface Credentials {
    token: string;
}

declare interface LoginCredentials {
    userName: string;
    password: string;
}

declare interface RegisterUser extends LoginCredentials {
    firstName: string;
    lastName: string;
}

interface ResponseWithToken {
    token: string;
}
