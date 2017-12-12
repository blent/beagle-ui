import { requires } from '../utils/contracts';
import proxy from './helpers/async-proxy';

class GenericItemActions {
    constructor(name, api, notifications) {
        requires('name', name);
        requires('api', api);
        requires('notifications', notifications);

        this.name = name;
        this.api = api;
        this.notifications = notifications;

        this.generateActions(
            'create',
            'cancel',
            'getComplete',
            'getFail',
            'saveComplete',
            'saveFail',
            'deleteComplete',
            'deleteFail'
        );
    }

    async get(id) {
        return this.api.get(id);
    }

    async save(model) {
        return this.api.save(model);
    }

    async delete(model) {
        return this.api.delete(model);
    }
}

export default proxy(GenericItemActions);
