export interface Message {
    message: string;
    fromUserName: string;
    toUserName: string;
    isRead: string;
}

export interface MessagePayload {
    message: string;
    toUserName: string;
}
