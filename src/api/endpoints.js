import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import map from 'lodash/map';
import merge from 'lodash/merge';
import constant from 'lodash/constant';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import { Map, List } from 'immutable';
import { requires } from '../utils/contracts';
import isImmutable from '../utils/is-immutable';
import Endpoint from '../models/endpoints/endpoint';

const NO_RETURN = constant(null);

const FIELDS = {
    http: Symbol('http')
};

const EndpointsService = composeClass({
    constructor(http) {
        requires('http', http);

        this[FIELDS.http] = http;
    },

    find(query) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: 'registry/endpoints',
            params: {
                take: get(query, 'take', 10),
                skip: get(query, 'skip', 0),
                name: get(query, 'name')
            }
        }).then((res) => {
            return Map({
                items: List(map(res.body.items, i => Endpoint(i))),
                quantity: res.body.quantity
            });
        });
    },

    get(id) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: `registry/endpoint/${id}`
        }).then((res) => {
            if (isEmpty(res.body)) {
                return null;
            }

            return Endpoint(res.body);
        });
    },

    save(endpoint) {
        if (isEmpty(endpoint)) {
            return Promise.reject(new Error('Invalid model'));
        }

        let model = endpoint;

        if (isImmutable(endpoint)) {
            model = endpoint.toJS();
        }

        const isNew = !(model.id > 0);

        return this[FIELDS.http].execute({
            method: isNew ? 'POST' : 'PUT',
            url: 'registry/endpoint',
            data: model
        }).then((res) => {
            if (isNew) {
                return Endpoint(merge({ id: parseFloat(res.text) }, model));
            }

            return Endpoint(merge({}, model));
        });
    },

    delete(endpoint) {
        if (isNil(endpoint) === true) {
            return Promise.reject(new Error('Missed endpoint'));
        }

        if (isNil(endpoint.id) === true || endpoint.id < 0) {
            return Promise.reject(new Error('Not saved endpoint'));
        }

        return this[FIELDS.http].execute({
            method: 'DELETE',
            url: `registry/endpoint/${endpoint.id}`
        }).then(NO_RETURN);
    },

    deleteMany(endpoints) {
        if (isNil(endpoints) === true) {
            return Promise.reject(new Error('Missed endpoints'));
        }

        if (List.isList(endpoints) === false && isArray(endpoints) === false) {
            return Promise.reject(new Error('Invalid list of endpoints'));
        }

        const data = endpoints.map(i => i.id);

        if (data.length === 0) {
            return Promise.reject(new Error('Missed endpoints'));
        }

        return this[FIELDS.http].execute({
            method: 'DELETE',
            url: 'registry/endpoints',
            data
        }).then(NO_RETURN);
    }
});

export default function create(...args) {
    return new EndpointsService(...args);
}
