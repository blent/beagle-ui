import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import map from 'lodash/map';
import { List } from 'immutable';
import { requires } from '../../../infrastructure/utils/contracts';
import Activity from './peripheral-activity';

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
        }).then((res) => {
            return List(map(res.body, i => Activity(i)));
        });
    }
});

export default function create(...args) {
    return new ActivityMonitoringService(...args);
}
