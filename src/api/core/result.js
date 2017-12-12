import Symbol from 'es6-symbol';

const FIELDS = {
    err: Symbol('err'),
    headers: Symbol('headers'),
    data: Symbol('data'),
};

export default class ApiResult {
    constructor(err, headers, data) {
        this[FIELDS.err] = err;
        this[FIELDS.headers] = headers;
        this[FIELDS.data] = data;
    }

    ok() {
        return this[FIELDS.err] == null;
    }

    headers() {
        return this[FIELDS.headers];
    }

    data() {
        return this[FIELDS.data];
    }

    error() {
        return this[FIELDS.err];
    }
}
