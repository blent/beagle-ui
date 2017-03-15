import composeClass from 'compose-class';
import DataSource from '../../models/data-source';
import { requires } from '../../../infrastructure/utils/contracts';

export default composeClass({
    constructor(actions, router) {
        requires('actions', actions);
        requires('router', router);

        this.bindActions(actions);

        this.router = router;
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
            this.router.redirect('/home/registry/peripherals');
        });
    },

    onGet() {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true);
        }));
    },

    onGetComplete(peripheral) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .set('data', peripheral);
        }));
    },

    onGetFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    }
});
