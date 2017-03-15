/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../infrastructure/utils/contracts';

export default composeClass({
    constructor(service) {
        requires('auth service', service);

        this.service = service;

        this.generateActions(
            'loginComplete',
            'loginFail',
            'logoutComplete',
            'logoutFail'
        );
    },

    login(username, password) {
        this.service
          .login(username, password)
          .then((credentials) => {
              this.loginComplete(credentials);
              return null;
          })
          .catch(err => this.loginFail(err));

        return null;
    },

    logout() {
        this.service
          .logout()
          .then(credentials => this.logoutComplete(credentials))
          .catch(err => this.logoutFail(err));

        return this;
    }
});
