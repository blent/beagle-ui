import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import map from 'lodash/map';
import { Map, List } from 'immutable';
import { requires } from '../utils/contracts';
import Activity from '../models/monitoring/peripheral-activity';

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
            return Map({
                items: List(map(res.body.items, i => Activity(i))),
                quantity: res.body.quantity
            });
        });
    }
});

export default function create(...args) {
    return new ActivityMonitoringService(...args);
}
