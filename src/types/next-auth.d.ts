import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user?: UserData;
        accessToken?: string;
        expires?: string;
    }

    interface JWT {
        user?: UserData;
        accessToken?: string;
    }
}
