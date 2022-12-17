export const COMMON_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export const ResponseTypes = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

export const API_ROUTES = {
    register: '/auth/register',
    login: '/auth/login',
    user: '/user',
    users: '/user/all',
};
