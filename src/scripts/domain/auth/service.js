import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import Promise from 'bluebird';

const FIELDS = {
    endpoint: Symbol('endpoint'),
    isAuthenticated: Symbol('isAuthenticated')
};

const AuthService = composeClass({
    constructor(params = {}) {
        this[FIELDS.endpoint] = params.endpoint;
        this[FIELDS.isAuthenticated] = false;
    },

    isAuthenticated() {
        return Promise.fromCallback(done => setTimeout(() => done(null, this[FIELDS.isAuthenticated]), 500));
    },

    login() {
        this[FIELDS.isAuthenticated] = true;
        return Promise.fromCallback(done => setTimeout(done, 1000));
    },

    logout() {
        this[FIELDS.isAuthenticated] = false;
        return Promise.resolve();
    }
});

export default function create(...args) {
    return new AuthService(...args);
}
