/* eslint-disable no-prototype-builtins, react/sort-comp, no-lonely-if, max-len */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Formsy from 'formsy-react';
import { Record } from 'immutable';
import List from '../../../../common/list/list';
import Form from './subscriber';

const MODES = (new (Record({
    LIST: 'list',
    FORM: 'form'
}))());

export default React.createClass({
    propTypes: {
        value: React.PropTypes.object,
        loading: React.PropTypes.bool,
        endpoints: React.PropTypes.object,
        endpointsActions: React.PropTypes.object
    },

    mixins: [
        PureRenderMixin,
        Formsy.Mixin
    ],

    getInitialState() {
        return {
            mode: MODES.LIST,
            value: this.props.value,
            item: null,
            itemIndex: null
        };
    },

    _onCreate() {
        const value = this.getValue();

        this.setState({
            mode: MODES.FORM,
            item: {},
            itemIndex: value ? value.size : 0
        });
    },

    // _onFormSave(newValues) {
    //     let value = this.state.value;
    //
    //     if (value == null) {
    //
    //     }
    // },
    //
    // _onFormDelete() {
    //
    // },
    //
    // _onFormCancel() {
    //
    // },

    _renderList() {
        const value = this.getValue();
        const quantity = value ? value.size : 0;

        return (
            <List
                title="Subscribers"
                items={this.getValue()}
                editable
                loading={this.props.loading}
                quantity={quantity}
                onCreate={this._onCreate}
            />
        );
    },

    _renderForm() {
        return (
            <Form
                item={this.state.item}
                endpoints={this.props.endpoints}
                endpointsActions={this.props.endpointsActions}
                loading={this.props.loading}
                onSave={this._onFormSave}
                onCancel={this._onFormCancel}
                onDelete={this._onFormDelete}
            />
        );
    },

    render() {
        let result = null;

        switch (this.state.mode) {
        case MODES.LIST:
            result = this._renderList();
            break;
        case MODES.FORM:
            result = this._renderForm();
            break;
        default:
            throw new Error('Unsupported mode');
        }

        return result;
    }
});
