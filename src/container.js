import Symbol from 'es6-symbol';
import Engine from 'namespaces-js';
import Immutable from 'immutable';
import { requires } from './utils/contracts';
import HttpClient from './api/core/client';
import Logger from './logging/logger';
import AuthApi from './api/auth';
import ActivityMonitoringApi from './api/activity-monitoring';
import SystemMonitoringApi from './api/system-monitoring';
import PeripheralsRegistryApi from './api/peripherals';
import EndpointsRegistryApi from './api/endpoints';

const SEPARATOR = '.';
const NAMESPACES = Engine.map({
    infrastructure: [
        'http',
        'logging'
    ],
    domain: [
        'monitoring',
        'registry'
    ],
    ui: [
        'actions',
        'stores',
        'routes'
    ]
}, SEPARATOR);

const FIELDS = {
    container: Symbol('container')
};

export const namespaces = NAMESPACES;

/**
 * Represents an application container.
 * @class Application
 */
export class Container {
    /**
     * Creates new instance of Application.
     * @param {object} settings - Application's settings.
     * @constructor
     */
    constructor(params = {}) {
        this[FIELDS.container] = new Engine({ separator: SEPARATOR });

        this[FIELDS.container].value('settings', Immutable.fromJS(params));
        this[FIELDS.container].const('log', params.logger || console);
        this[FIELDS.container].factory('logger', ['log', 'settings'], (log, settings) => {
            return (prefix) => {
                return new Logger(log, { prefix: `[${prefix}]`, debug: settings.get('debug') });
            };
        });

        // HTTP Client
        this.register(NAMESPACES.infrastructure.http()).service('client', [
            'settings'
        ], (settings) => {
            return new HttpClient(settings.getIn(['http']).toJS());
        });

        // Authentication Service
        this.register(NAMESPACES.domain()).service('authentication', [
            NAMESPACES.infrastructure.http('client')
        ], client => new AuthApi(client));

        // Activity Monitoring Service
        this.register(NAMESPACES.domain.monitoring()).service('activity', [
            NAMESPACES.infrastructure.http('client')
        ], client => new ActivityMonitoringApi(client));

        // System Monitoring Service
        this.register(NAMESPACES.domain.monitoring()).service('system', [
            NAMESPACES.infrastructure.http('client')
        ], client => new SystemMonitoringApi(client));

        // Peripherals Registry Service
        this.register(NAMESPACES.domain.registry()).service('peripherals', [
            NAMESPACES.infrastructure.http('client')
        ], client => new PeripheralsRegistryApi(client));

        this.register(NAMESPACES.domain.registry()).service('endpoints', [
            NAMESPACES.infrastructure.http('client')
        ], client => new EndpointsRegistryApi(client));
    }

    createLogger(source) {
        return this[FIELDS.container].resolve('logger')(source);
    }

    /**
     * Resolves a service by path.
     * @param {string} path - Service's path.
     * @returns {any} Any type.
     */
    resolve(path) {
        requires('path', path);
        return this[FIELDS.container].resolve(path);
    }

    resolveAll(from) {
        requires('namespace', from);
        return this[FIELDS.container].resolveAll(from);
    }

    /**
     * Registers a service in namespace.
     * @param {string} namespace - Service's namespace.
     * @returns {any} Module registry.
     */
    register(namespace) {
        requires('namespace', namespace);
        return this[FIELDS.container].namespace(namespace);
    }
}
