/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../../infrastructure/utils/contracts';

export default composeClass({
    constructor(service) {
        requires('monitoring service', service);

        this.service = service;

        this.generateActions(
            'findComplete',
            'findFail'
        );
    },

    find(query) {
        this.service.getActivity(query)
            .then(result => this.findComplete(result))
            .catch(reason => this.findFail(reason));

        return null;
    }
});
