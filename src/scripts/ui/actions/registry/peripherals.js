/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../../infrastructure/utils/contracts';

export default composeClass({
    constructor(service) {
        requires('targets service', service);

        this.service = service;

        this.generateActions(
            'findComplete',
            'findFail'
        );
    },

    find(query) {
        this.service.find(query)
            .then(result => this.findComplete(result))
            .catch(reason => this.findFail(reason));

        return null;
    }
});
