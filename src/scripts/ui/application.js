import Alt from 'alt';
import immutableUtil from 'alt-utils/lib/ImmutableUtil';
import Symbol from 'es6-symbol';
import constant from 'lodash/constant';
import Formsy from 'formsy-react';
import {
    namespaces,
    Container
} from '../domain/container';
import Router from './router';
import AuthActions from './actions/authentication';
import AuthStore from './stores/authentication';
import NotificationsActions from './actions/notifications';
import NotificationsStore from './stores/notifications';
import GenericListActions from './actions/generic-list';
import GenericItemActions from './actions/generic-item';
import GenericListStore from './stores/generic-list';
import GenericItemStore from './stores/generic-item';
import LoginRoute from './routes/login';
import HomeRoute from './routes/home/index';
import GenericListRoute from './routes/home/generic-list';
import GenericItemRoute from './routes/home/generic-item';
import isUUID from './validation/rules/uuid';
import {
    minValue
} from './validation/rules/number';
import notEmptyString from './validation/rules/not-empty-string';
import required from './validation/rules/required';

const FIELDS = {
    container: Symbol('container')
};

class Application extends Alt {
    constructor(params) {
        super({});

        this[FIELDS.container] = Container(params);
        this[FIELDS.container].register(namespaces.ui()).factory('router', [
            'logger',
            'settings'
        ], (createLogger, settings) => {
            return Router({
                logger: createLogger('router'),
                engine: settings.get('history').toJS()
            });
        });

        // Authentication
        this.addActions('authentication', [
            namespaces.domain('authentication')
        ], AuthActions);
        this.addStore('authentication', [
            namespaces.ui.actions('authentication'),
            namespaces.ui('router')
        ], AuthStore);
        this.addRouteHandler('login', [
            namespaces.ui.stores('authentication')
        ], LoginRoute);

        // Home
        this.addRouteHandler('home', [
            namespaces.ui.stores('authentication')
        ], HomeRoute);

        // Notifications
        this.addActions('notifications', [], NotificationsActions);
        this.addStore('notifications', [
            namespaces.ui.actions('notifications'),
            namespaces.ui('router')
        ], NotificationsStore);

        // Activity Monitoring
        this.addActions('monitoring/activity', [
            constant('peripheral activity'),
            namespaces.domain.monitoring('activity'),
            namespaces.ui.actions('notifications'),
        ], GenericListActions);
        this.addStore('monitoring/activity', [
            namespaces.ui.actions('monitoring/activity')
        ], GenericListStore);
        this.addRouteHandler('home/monitoring/activity', [
            namespaces.ui.actions('monitoring/activity'),
            constant({ take: 10, skip: 0 })
        ], GenericListRoute);

        // System Monitoring
        this.addActions('monitoring/system', [
            constant('system monitoring'),
            namespaces.domain.monitoring('system'),
            namespaces.ui.actions('notifications'),
        ], GenericListActions);
        this.addStore('monitoring/system', [
            namespaces.ui.actions('monitoring/system')
        ], GenericListStore);
        this.addRouteHandler('home/monitoring/system', [
            namespaces.ui.actions('monitoring/system')
        ], GenericListRoute);

        // Peripherals Registry List
        this.addActions('registry/peripherals', [
            constant('peripherals'),
            namespaces.domain.registry('peripherals'),
            namespaces.ui.actions('notifications')
        ], GenericListActions);
        this.addStore('registry/peripherals', [
            namespaces.ui.actions('registry/peripherals'),
            namespaces.ui('router'),
            constant('/home/registry/peripheral')
        ], GenericListStore);
        this.addRouteHandler('home/registry/peripherals', [
            namespaces.ui.actions('registry/peripherals'),
            constant({ take: 10, skip: 0 })
        ], GenericListRoute);

        // Peripheral Edit Form
        this.addActions('registry/peripheral', [
            constant('peripheral'),
            namespaces.domain.registry('peripherals'),
            namespaces.ui.actions('notifications'),
        ], GenericItemActions);
        this.addStore('registry/peripheral', [
            namespaces.ui.actions('registry/peripheral'),
            namespaces.ui('router'),
            constant('/home/registry/peripherals')
        ], GenericItemStore);
        this.addRouteHandler('home/registry/peripheral', [
            namespaces.ui.actions('registry/peripheral'),
        ], GenericItemRoute);

        // Endpoints Registry List
        this.addActions('registry/endpoints', [
            constant('endpoints'),
            namespaces.domain.registry('endpoints'),
            namespaces.ui.actions('notifications'),
        ], GenericListActions);
        this.addStore('registry/endpoints', [
            namespaces.ui.actions('registry/endpoints'),
            namespaces.ui('router'),
            constant('/home/registry/endpoint')
        ], GenericListStore);
        this.addRouteHandler('home/registry/endpoints', [
            namespaces.ui.actions('registry/endpoints'),
            constant({ take: 10, skip: 0 })
        ], GenericListRoute);

        // Endpoint Edit Form
        this.addActions('registry/endpoint', [
            constant('endpoint'),
            namespaces.domain.registry('endpoints'),
            namespaces.ui.actions('notifications')
        ], GenericItemActions);
        this.addStore('registry/endpoint', [
            namespaces.ui.actions('registry/endpoint'),
            namespaces.ui('router'),
            constant('/home/registry/endpoints')
        ], GenericItemStore);
        this.addRouteHandler('home/registry/endpoint', [
            namespaces.ui.actions('registry/endpoint'),
        ], GenericItemRoute);


        // Validation rules
        Formsy.addValidationRule('isUUID', isUUID);
        Formsy.addValidationRule('minValue', minValue);
        Formsy.addValidationRule('notEmptyString', notEmptyString);
        Formsy.addValidationRule('required', required);
    }

    addActions(name, dependencies = [], constructor) {
        this[FIELDS.container].register(namespaces.ui.actions()).factory(name, dependencies, (...args) => {
            const action = super.createActions(constructor, {}, ...args);

            this.actions[name] = action;

            return action;
        });
    }

    addStore(name, dependencies = [], constructor) {
        this[FIELDS.container].register(namespaces.ui.stores()).factory(name, dependencies, (...args) => {
            super.addStore(name, constructor, ...args);
            return this.stores[name];
        });
    }

    addRouteHandler(name, dependencies = [], constructor) {
        this[FIELDS.container].register(namespaces.ui.routes()).factory(name, dependencies, constructor);
    }

    createStore(constructor, ...args) {
        return super.createStore(immutableUtil(constructor), ...args);
    }

    getActions(name) {
        return this[FIELDS.container].resolve(namespaces.ui.actions(name));
    }

    getStore(name) {
        return this[FIELDS.container].resolve(namespaces.ui.stores(name));
    }

    getRouteHandler(name) {
        return this[FIELDS.container].resolve(namespaces.ui.routes(name));
    }
}

export default function create(settings) {
    return new Application(settings);
}
