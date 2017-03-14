import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import { requires } from '../../infrastructure/utils/contracts';

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
        }).then(resp => resp.body);
    },

    get(id) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: `registry/peripherals/${id}`
        }).then(resp => resp.body);
    },

    create(peripheral) {
        return this[FIELDS.http].execute({
            method: 'POST',
            url: 'registry/peripherals',
            data: peripheral
        }).then(resp => resp.body);
    },

    save(peripheral) {
        return this[FIELDS.http].execute({
            method: 'PUT',
            url: 'registry/peripherals',
            data: peripheral
        }).then(resp => resp.body);
    },

    delete(id) {
        return this[FIELDS.http].execute({
            method: 'PUT',
            url: `registry/peripherals/${id}`
        }).then(resp => resp.body);
    }
});

export default function create(...args) {
    return new PeripheralsService(...args);
}
