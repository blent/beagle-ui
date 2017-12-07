/* eslint-disable lodash/prefer-includes */
import composeClass from 'compose-class';
import { List } from 'immutable';
import urlJoin from 'url-join';
import DataSource from '../models/data-source';
import QueryResult from '../models/query-result';
import { requires } from '../utils/contracts';

const PATH_QUERY_RESULT = ['data', 'result'];
const PATH_QUERY_RESULT_ITEMS = ['data', 'result', 'items'];

export default composeClass({
    constructor(actions, router, editRoute) {
        requires('actions', actions);

        this.bindActions(actions);

        this.router = router;
        this.editRoute = editRoute;
        this.state = DataSource({
            loading: false,
            error: null,
            data: QueryResult()
        });
    },

    onCreate() {
        if (this.router && this.editRoute) {
            setTimeout(() => {
                this.router.redirect(this.editRoute);
            });
        }
    },

    onEdit(entry) {
        if (this.router && this.editRoute) {
            setTimeout(() => {
                this.router.redirect(urlJoin(this.editRoute, entry.id));
            });
        }
    },

    onDelete() {
        this.setState(this.state.merge({
            isLoading: true,
            error: null
        }));
    },

    onDeleteComplete(entries) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .setIn(PATH_QUERY_RESULT_ITEMS, state
                    .getIn(PATH_QUERY_RESULT_ITEMS)
                    .filter((item) => {
                        return entries.indexOf(item) < 0;
                    }));
        }));
    },

    onDeleteFail(reason) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', reason);
        }));
    },

    onFind(query) {
        this.setState(this.state.merge({
            isLoading: true,
            error: null,
            data: QueryResult(query, List())
        }));
    },

    onFindComplete(entries) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .setIn(PATH_QUERY_RESULT, entries);
        }));
    },

    onFindFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    }
});
