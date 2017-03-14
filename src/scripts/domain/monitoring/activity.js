import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import { requires } from '../../infrastructure/utils/contracts';

const FIELDS = {
    http: Symbol('http')
};

const ActivityMonitoringService = composeClass({
    constructor(http) {
        requires('http', http);

        this[FIELDS.http] = http;
    },

    find(query) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: 'monitoring/activity',
            params: {
                take: get(query, 'take', 10),
                skip: get(query, 'skip', 0)
            }
        }).then(resp => resp.body);
    }
});

export default function create(...args) {
    return new ActivityMonitoringService(...args);
}
