import Symbol from 'es6-symbol';
import { Map, List } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import merge from 'lodash/merge';
import map from 'lodash/map';
import { requires } from '../../utils/contracts';
import isImmutable from '../../utils/is-immutable';
import Result from './result';

const FIELDS = {
    client: Symbol('client'),
    name: Symbol('name'),
    mapper: Symbol('mapper'),
    endpoints: Symbol('endpoints')
};

function mapOne(api, item) {
    return api[FIELDS.mapper](item);
}

function mapMany(api, items) {
    return map(items, i => api[FIELDS.mapper](i));
}

function assertEndpoint(endpoint, type) {
    if (isEmpty(endpoint) === true) {
        throw new Error(`${type} endpoint is not defined`);
    }
}

function cloneResult(parent, data) {
    return new Result(null, parent.headers(), data);
}

export default class Api {
    constructor(params = {}) {
        requires('http client', params.client);
        requires('data mapper', params.mapper);
        requires('endpoints', params.endpoints);

        this[FIELDS.client] = params.client;
        this[FIELDS.name] = params.name || 'Api';
        this[FIELDS.mapper] = params.mapper;
        this[FIELDS.endpoints] = Map(params.endpoints);
    }

    client() {
        return this[FIELDS.client];
    }

    endpoints() {
        return this[FIELDS.endpoints];
    }

    async find(query) {
        const endpoint = this[FIELDS.endpoints].get('query');

        assertEndpoint(endpoint, 'Query');

        const result = await this[FIELDS.client].get(endpoint, {
            query
        });

        if (result.ok() === false) {
            return result;
        }

        return cloneResult(result, Map({
            items: List(mapMany(this, get(result.data(), 'items', []))),
            quantity: get(result.data(), 'quantity', 0)
        }));
    }

    async get(id) {
        const endpoint = this[FIELDS.endpoints].get('fetch');

        assertEndpoint(endpoint, 'Fetch');

        const res = await this[FIELDS.client].get(`${endpoint}/${id}`);

        if (res.ok() === false) {
            return res;
        }

        return cloneResult(res, mapOne(this, res.data()));
    }

    async save(input) {
        const endpoint = this[FIELDS.endpoints].get('save');

        assertEndpoint(endpoint, 'Save');

        if (isEmpty(input) === true) {
            return new Result(new ReferenceError('Missed input'));
        }

        const model = isImmutable(input) ? input.toJS() : input;
        const isNew = !(model.id > 0);

        let res;

        if (isNew === true) {
            res = await this[FIELDS.client].post(endpoint, model);
        } else {
            res = await this[FIELDS.client].put(endpoint, model);
        }

        if (res.ok() === false) {
            return res;
        }

        if (isNew === false) {
            return cloneResult(res, mapOne(this, model));
        }

        return cloneResult(res, mapOne(this, merge({
            id: res.data()
        }, model)));
    }

    async delete(input) {
        const endpoint = this[FIELDS.endpoints].get('delete');

        assertEndpoint(endpoint, 'Delete');

        if (isEmpty(input)) {
            return new Result(new ReferenceError('Missed input'));
        }

        if (input.id == null || input.id < 0) {
            return new Result(new Error('Input is not persisted'));
        }

        const res = await this[FIELDS.client].del(`${endpoint}/${input.id}`);

        if (res.ok() === false) {
            return res;
        }

        return cloneResult(res, null);
    }

    async deleteMany(input) {
        if (isEmpty(input) === true) {
            return new Result(new ReferenceError('Missed input'));
        }

        if (List.isList(input) === false && isArray(input) === false) {
            return new Result(new Error('Invalid list of inputs'));
        }

        const data = input.map(i => i.id);

        if (data.length === 0) {
            return new Result(new Error('Missed inputs'));
        }

        const res = await this.client().del(this[FIELDS.endpoints].get('deleteMany'), data);

        if (res.ok() === false) {
            return res;
        }

        return new Result();
    }
}
