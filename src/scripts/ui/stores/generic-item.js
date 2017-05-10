import composeClass from 'compose-class';
import urlJoin from 'url-join';
import DataSource from '../models/data-source';
import { requires } from '../../infrastructure/utils/contracts';

const PATH_ITEM_ID = ['data', 'id'];

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

    isNew() {
        const id = this.state.getIn(PATH_ITEM_ID);

        if (!id) {
            return true;
        }

        return !(id > 0);
    },

    onCreate() {
        this.setState(this.state.withMutations((state) => {
            return state
              .set('isLoading', false)
              .set('error', null)
              .set('data', null);
        }));
    },

    onCancel() {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true)
                .set('data', null);
        }));

        setTimeout(() => {
            this.router.redirect(this.cancelRoute);
        });
    },

    onGet() {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', true)
                .set('error', null)
                .set('data', null);
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
        const isNew = this.isNew();

        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', null)
                .set('data', model);
        }));

        if (isNew) {
            setTimeout(() => {
                this.router.redirect(urlJoin(
                    this.router.getLocation().pathname,
                    this.state.getIn(PATH_ITEM_ID)
                ));
            });
        }
    },

    onSaveFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    },

    onDelete() {
        this.setState(this.state.withMutations((state) => {
            return state
              .set('isLoading', true);
        }));
    },

    onDeleteComplete() {
        this.onCancel();
    },

    onDeleteFail(err) {
        this.setState(this.state.withMutations((state) => {
            return state
                .set('isLoading', false)
                .set('error', err);
        }));
    }
});
