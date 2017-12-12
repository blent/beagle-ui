import Symbol from 'es6-symbol';
import Credentials from '../models/auth/credentials';
import Result from './core/result';

const FIELDS = {
    client: Symbol('client'),
    credentials: Symbol('credentials')
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class AuthApi {
    constructor(client) {
        this[FIELDS.client] = client;
        this[FIELDS.credentials] = Credentials();
    }

    getCredentials() {
        return this[FIELDS.credentials];
    }

    async login(username) {
        // mocking
        await timeout(1000);

        this[FIELDS.credentials] = this[FIELDS.credentials].merge({
            username,
            authenticated: true
        });

        return new Result(null, {}, this[FIELDS.credentials]);
    }

    async logout() {
        await timeout(1000);

        this[FIELDS.credentials] = this[FIELDS.credentials].set('authenticated', false);

        return new Result(null, {}, this[FIELDS.credentials]);
    }
}
