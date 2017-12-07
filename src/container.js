import composeClass from 'compose-class';
import Symbol from 'es6-symbol';
import ContainerEngine from 'namespaces-js';
import Immutable from 'immutable';
import { requires } from './utils/contracts';
import HttpClient from './api/core/client';
import Logger from './logging/logger';
import AuthService from './api/auth';
import ActivityMonitoringService from './api/activity-monitoring';
import SystemMonitoringService from './api/system-monitoring';
import PeripheralsRegistryService from './api/peripherals';
import EndpointsRegistryService from './api/endpoints';

const SEPARATOR = '.';
const NAMESPACES = ContainerEngine.map({
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

/**
 * Represents an application container.
 * @class Application
 */
const ApplicationConainer = composeClass({
    /**
     * Creates new instance of Application.
     * @param {object} settings - Application's settings.
     * @constructor
     */
    constructor(params = {}) {
        this[FIELDS.container] = new ContainerEngine({ separator: SEPARATOR });

        this[FIELDS.container].value('settings', Immutable.fromJS(params));
        this[FIELDS.container].const('log', params.logger || console);
        this[FIELDS.container].factory('logger', ['log', 'settings'], (log, settings) => {
            return (prefix) => {
                return Logger(log, { prefix: `[${prefix}]`, debug: settings.get('debug') });
            };
        });

        // HTTP Client
        this.register(NAMESPACES.infrastructure.http()).service('client', [
            'settings'
        ], (settings) => {
            return HttpClient(settings.getIn(['http', 'api']));
        });

        // Authentication Service
        this.register(NAMESPACES.domain()).service('authentication', AuthService);

        // Activity Monitoring Service
        this.register(NAMESPACES.domain.monitoring()).service('activity', [
            NAMESPACES.infrastructure.http('client')
        ], ActivityMonitoringService);

        // System Monitoring Service
        this.register(NAMESPACES.domain.monitoring()).service('system', [
            NAMESPACES.infrastructure.http('client')
        ], SystemMonitoringService);

        // Peripherals Registry Service
        this.register(NAMESPACES.domain.registry()).service('peripherals', [
            NAMESPACES.infrastructure.http('client')
        ], PeripheralsRegistryService);

        this.register(NAMESPACES.domain.registry()).service('endpoints', [
            NAMESPACES.infrastructure.http('client')
        ], EndpointsRegistryService);
    },

    createLogger(source) {
        return this[FIELDS.container].resolve('logger')(source);
    },

    /**
     * Resolves a service by path.
     * @param {string} path - Service's path.
     * @returns {any} Any type.
     */
    resolve(path) {
        requires('path', path);
        return this[FIELDS.container].resolve(path);
    },

    resolveAll(from) {
        requires('namespace', from);
        return this[FIELDS.container].resolveAll(from);
    },

    /**
     * Registers a service in namespace.
     * @param {string} namespace - Service's namespace.
     * @returns {any} Module registry.
     */
    register(namespace) {
        requires('namespace', namespace);
        return this[FIELDS.container].namespace(namespace);
    }
});

export const namespaces = NAMESPACES;

export function Container(...args) {
    return new ApplicationConainer(...args);
}
