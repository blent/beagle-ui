import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import map from 'lodash/map';
import constant from 'lodash/constant';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import { Map, List } from 'immutable';
import { requires } from '../../../infrastructure/utils/contracts';
import isImmutable from '../../../infrastructure/utils/is-immutable';
import Peripheral from './peripheral';

const NO_RETURN = constant(null);

const FIELDS = {
    http: Symbol('http')
};

const PeripheralsService = composeClass({
    constructor(http) {
        requires('http', http);

        this[FIELDS.http] = http;
    },

    find(query) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: 'registry/peripherals',
            params: {
                take: get(query, 'take', 10),
                skip: get(query, 'skip', 0)
            }
        }).then((res) => {
            return Map({
                items: List(map(res.body.items, i => Peripheral(i))),
                quantity: res.body.quantity
            });
        });
    },

    get(id) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: `registry/peripheral/${id}`
        }).then((res) => {
            if (isEmpty(res.body)) {
                return null;
            }

            return Peripheral(res.body);
        });
    },

    save(peripheral) {
        if (isNil(peripheral)) {
            return Promise.reject(new Error('Invalid model'));
        }

        let model = peripheral;

        if (isImmutable(peripheral)) {
            model = peripheral.toJS();
        }

        const isNew = !(model.id > 0);

        return this[FIELDS.http].execute({
            method: isNew ? 'POST' : 'PUT',
            url: 'registry/peripheral',
            data: model
        }).then((res) => {
            if (isNew) {
                return Peripheral(merge({ id: parseFloat(res.text) }, model));
            }

            return Peripheral(merge({}, model));
        });
    },

    delete(peripheral) {
        if (isNil(peripheral) === true) {
            return Promise.reject(new Error('Missed peripheral'));
        }

        if (isNil(peripheral.id) === true || peripheral.id < 0) {
            return Promise.reject(new Error('Not saved peripheral'));
        }

        return this[FIELDS.http].execute({
            method: 'DELETE',
            url: `registry/peripheral/${peripheral.id}`
        }).then(NO_RETURN);
    },

    deleteMany(peripherals) {
        if (isNil(peripherals) === true) {
            return Promise.reject(new Error('Missed peripherals'));
        }

        if (List.isList(peripherals) === false && isArray(peripherals) === false) {
            return Promise.reject(new Error('Invalid list of peripherals'));
        }

        const data = peripherals.map(i => i.id);

        if (data.length === 0) {
            return Promise.reject(new Error('Missed peripherals'));
        }

        return this[FIELDS.http].execute({
            method: 'DELETE',
            url: 'registry/peripherals',
            data
        }).then(NO_RETURN);
    }
});

export default function create(...args) {
    return new PeripheralsService(...args);
}
