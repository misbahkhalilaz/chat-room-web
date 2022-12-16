declare interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

declare interface UserResponse {
    user: UserData;
    token: string;
}
