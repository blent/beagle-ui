import composeClass from 'compose-class';
import DataSource from '../models/data-source';
import { requires } from '../../infrastructure/utils/contracts';

export default composeClass({
    constructor(actions, router, cancelRoute) {
        requires('actions', actions);
        requires('router', router);

        this.bindActions(actions);

        this.router = router;
        this.cancelRoute = cancelRoute;
        this.state = DataSource({
            loading: false,
            error: null,
            data: null
        });
    },

    onCancel() {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true)
                .set(['data'], null);
        }));

        setTimeout(() => {
            this.router.redirect(this.cancelRoute);
        });
    },

    onGet() {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true);
        }));
    },

    onGetComplete(model) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .set('data', model);
        }));
    },

    onGetFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    },

    onSave() {
        this.setState(this.state.withMutations((state) => {
            return state
              .set('isLoading', true);
        }));
    },

    onSaveComplete(model) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .set('data', model);
        }));
    },

    onSaveFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    },
});
