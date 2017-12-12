import DataSource from '../models/data-source';
import { requires } from '../utils/contracts';

function defer(cb) {
    setTimeout(cb);
}

export default class AuthStore {
    constructor(authActions, router) {
        requires('auth actions', authActions);
        requires('router', router);

        this.bindActions(authActions);

        this.router = router;
        this.state = DataSource({
            data: null
        });
    }

    onLogin() {
        this.setState(this.state.set('isLoading', true));
    }

    onLoginComplete(credentials) {
        this.setState(DataSource({
            isLoading: false,
            error: null,
            data: credentials
        }));

        defer(() => this.router.navigate('/home'));
    }

    onLoginFail(err) {
        this.setState(this.state.merge({
            isLoading: false,
            error: err
        }));
    }

    onLogoutComplete(credentials) {
        this.setState(this.state.merge({
            isLoading: false,
            data: credentials
        }));

        defer(() => this.router.navigate('/login'));
    }

    onLogoutFail(err) {
        this.setState(this.state.merge({
            isLoading: false,
            error: err
        }));
    }
}
