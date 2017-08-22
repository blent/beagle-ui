import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import { requires } from '../../../infrastructure/utils/contracts';
import Stats from './stats';

const FIELDS = {
    http: Symbol('http')
};

const SystemMonitoringService = composeClass({
    constructor(http) {
        requires('http', http);

        this[FIELDS.http] = http;
    },

    find() {
        return this[FIELDS.http].execute({
            method: 'GET',
            url: 'monitoring/system'
        }).then((res) => {
            return Stats(res.body);
        });
    }
});

export default function create(...args) {
    return new SystemMonitoringService(...args);
}
