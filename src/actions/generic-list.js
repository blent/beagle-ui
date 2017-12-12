import { requires } from '../utils/contracts';
import proxy from './helpers/async-proxy';

class GenericListActions {
    constructor(name, api, notifications) {
        requires('name', name);
        requires('api', api);
        requires('notifications', notifications);

        this.name = name;
        this.api = api;
        this.notifications = notifications;

        this.generateActions(
            'create',
            'edit',
            'deleteComplete',
            'deleteFail',
            'findComplete',
            'findFail'
        );
    }

    async find(query = null) {
        return this.api.find(query);
    }

    async delete(entries) {
        return this.api.deleteMany(entries);
    }
}

export default proxy(GenericListActions);
