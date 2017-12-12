import Symbol from 'es6-symbol';
import join from 'url-join';
import axios from 'axios';
import keys from 'lodash/keys';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import ApiResult from './result';
import ApiError from './error';

const FIELDS = {
    baseUrl: Symbol('baseUrl'),
};

function queryParams(params) {
    if (params == null) {
        return '';
    }

    return `?${map(keys(params), k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')}`;
}

async function request(client, method, path, options = {}, payload = null) {
    let url = join(
        client[FIELDS.baseUrl],
        path,
        queryParams(options.query),
    );

    if (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1);
    }
    const req = {
        url,
        method,
        headers: {
            Accept: 'application/json; charset=utf-8',
        },
    };

    if (options.headers != null) {
        forEach(options.headers, (value, key) => {
            req.headers[key] = value;
        });
    }

    if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && payload != null) {
        req.data = payload;
    }

    let resp;
    let err;

    try {
        resp = await axios(req);
    } catch (e) {
        err = e;
    }

    if (err != null) {
        if (resp != null) {
            return new ApiResult(new ApiError(err, resp.headers));
        }

        return new ApiResult(new ApiError(err));
    }

    return new ApiResult(null, resp.headers, resp.data);
}

export default class HttpClient {
    constructor(options) {
        this[FIELDS.baseUrl] = options.baseUrl || '/';
    }

    async get(path, options) {
        return request(this, 'GET', path, options);
    }

    async put(path, data, options) {
        return request(this, 'PUT', path, options, data);
    }

    async post(path, data, options) {
        return request(this, 'POST', path, options, data);
    }

    async del(path, data, options) {
        return request(this, 'DELETE', path, options, data);
    }
}
