import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import get from 'lodash/get';
import urlJoint from 'url-join';
import { requires } from '../../infrastructure/utils/contracts';

const FIELDS = {
    url: Symbol('url'),
    http: Symbol('http')
};

const ActivityService = composeClass({
    constructor(params = {}) {
        requires('params', params);
        requires('params.url', params.url);
        requires('params.http', params.http);

        this[FIELDS.url] = params.url;
        this[FIELDS.http] = params.http;
    },

    getActivity(query) {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: urlJoint(this[FIELDS.url], 'monitoring/activity'),
            params: {
                take: get(query, 'take', 10),
                skip: get(query, 'skip', 0)
            }
        });
    }
});

export default function create(...args) {
    return new ActivityService(...args);
}
