import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth, {CallbacksOptions, NextAuthOptions} from 'next-auth';
import Providers from 'next-auth/providers';
import {API_ROUTES} from 'src/util/constants';
import {request} from 'src/util/request';

const MAX_SESSION_AGE = 60 * 60; // 60 min

const callbacks: CallbacksOptions = {
    async jwt(token, user) {
        const currentToken = user?.token || token?.accessToken;
        if (currentToken) {
            const userData = await request<null, UserData>({
                path: API_ROUTES.user,
                method: 'get',
                token: currentToken as string,
            });

            if (userData.success) {
                const data = userData.success.data;
                token.accessToken = currentToken;
                token.user = {
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    isOnline: data.isOnline,
                };
            } else {
                token.accessToken = null;
                token.user = null;
            }
        }

        return token; //forwarded to callbacks session()
    },

    async session(session, userOrToken) {
        session.accessToken = userOrToken.accessToken as string;
        session.user = userOrToken.user as UserData;
        return session; //session is now availble on both Client's useSession() and Server's getSession()
    },
};

const providers = [
    Providers.Credentials({
        name: 'credentials',
        credentials: {},
        authorize: async ({token}: Credentials) => {
            if (token) {
                return {token}; //forwarded to callbacks jwt()
            }
            return null;
        },
    }),
];

const options: NextAuthOptions = {
    providers,
    callbacks,
    session: {
        maxAge: MAX_SESSION_AGE,
    },
    jwt: {
        maxAge: MAX_SESSION_AGE,
    },
    debug: true,
    pages: {
        error: '/',
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
