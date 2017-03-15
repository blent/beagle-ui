import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import map from 'lodash/map';
import merge from 'lodash/merge';
import constant from 'lodash/constant';
import isEmpty from 'lodash/isEmpty';
import { List } from 'immutable';
import { requires } from '../../../infrastructure/utils/contracts';
import isImmutable from '../../../infrastructure/utils/is-immutable';
import Endpoint from './endpoint';

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
                skip: get(query, 'skip', 0)
            }
        }).then((res) => {
            return List(map(res.body, i => Endpoint(i)));
        });
    },

    get(id) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: `registry/endpoints/${id}`
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
                return Endpoint(merge({ id: res.body }, model));
            }

            return Endpoint(merge({}, model));
        });
    },

    delete(id) {
        if (id < 0) {
            return Promise.reject(new Error('Invalid id'));
        }

        return this[FIELDS.http].execute({
            method: 'PUT',
            url: `registry/endpoints/${id}`
        }).then(NO_RETURN);
    }
});

export default function create(...args) {
    return new EndpointsService(...args);
}
