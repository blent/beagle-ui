import { requires } from '../utils/contracts';
import proxy from './helpers/async-proxy';

class AuthActions {
    constructor(api) {
        requires('api', api);

        this.api = api;

        this.generateActions(
            'loginComplete',
            'loginFail',
            'logoutComplete',
            'logoutFail'
        );
    }

    async login(username, password) {
        return this.api.login(username, password);
    }

    async logout() {
        return this.api.logout();
    }
}

export default proxy(AuthActions);
