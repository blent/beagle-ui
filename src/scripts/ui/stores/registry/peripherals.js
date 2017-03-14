import composeClass from 'compose-class';
import { List } from 'immutable';
import map from 'lodash/map';
import DataSource from '../../models/data-source';
import QueryResult from '../../models/query-result';
import Peripheral from '../../models/peripheral';
import { requires } from '../../../infrastructure/utils/contracts';

export default composeClass({
    constructor(actions) {
        requires('actions', actions);

        this.bindActions(actions);

        this.state = DataSource({
            data: QueryResult()
        });
    },

    find(query) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true)
                .setIn(['data', 'query'], query);
        }));
    },

    onFindComplete(entries) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .setIn(['data', 'result'], List(map(entries, Peripheral)));
        }));
    },

    onFindFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err)
                .setIn(['data', 'result'], List());
        }));
    }
});
