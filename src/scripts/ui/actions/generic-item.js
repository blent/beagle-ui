/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../infrastructure/utils/contracts';
import {
    onAsyncComplete,
    onAsyncFail
} from './helpers/action-async-handlers';

export default composeClass({
    constructor(name, service, notifications) {
        requires('name', name);
        requires('service', service);
        requires('notifications', notifications);

        this.name = name;
        this.service = service;
        this.notifications = notifications;

        this.generateActions(
          'cancel',
            'getComplete',
            'getFail',
            'saveComplete',
            'saveFail'
        );
    },

    get(id) {
        this.service.get(id)
            .then(onAsyncComplete(this, 'get'))
            .catch(onAsyncFail(this, 'get'));

        return null;
    },

    save(model) {
        this.service.save(model)
        .then(onAsyncComplete(this, 'save'))
        .catch(onAsyncFail(this, 'save'));

        return null;
    }
});
