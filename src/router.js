import Symbol from 'es6-symbol';
import { requires } from './utils/contracts';

const FIELDS = {
    logger: Symbol('logger'),
    engine: Symbol('engine')
};

export default class Router {
    constructor(params) {
        requires('params', params);
        requires('params.logger', params.logger);
        requires('params.engine', params.engine);

        this[FIELDS.logger] = params.logger;
        this[FIELDS.engine] = params.engine;
    }

    getLocation() {
        return this[FIELDS.engine].getCurrentLocation();
    }

    navigate(path) {
        requires('path', path);

        this[FIELDS.engine].push(path);

        return this;
    }

    redirect(path) {
        requires('path', path);

        this[FIELDS.engine].replace(path);

        return this;
    }

    subscribe(handler) {
        requires('handler', handler);

        return this[FIELDS.engine].listen(handler);
    }
}
