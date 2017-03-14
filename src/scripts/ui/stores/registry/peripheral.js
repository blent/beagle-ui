import composeClass from 'compose-class';
import DataSource from '../../models/data-source';
import Peripheral from '../../models/peripheral';
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
            data: Peripheral()
        });
    },

    onCancel() {
        setTimeout(() => {
            this.router.redirect('/home/registry/peripherals');
        });
    },

    onGet(id) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true)
                .set(['data'], Peripheral({ id }));
        }));
    },

    onGetComplete(peripheral) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .set('data', Peripheral(peripheral));
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
