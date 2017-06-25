/* eslint-disable no-prototype-builtins, react/sort-comp, no-lonely-if, max-len */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Formsy from 'formsy-react';
import { Record, List } from 'immutable';
import includes from 'lodash/includes';
import Subscriber from '../../../../../../domain/registry/peripherals/subscriber';
import DataList from '../../../../common/list/list';
import EnabledIcon from '../../../../common/icons/boolean';
import Form from './subscriber';

const MODES = (new (Record({
    LIST: 'list',
    FORM: 'form'
}))());

const DATA_LIST_COLUMNS = List([
    {
        displayName: 'Name',
        columnName: 'name'
    },
    {
        displayName: 'Event',
        columnName: 'event'
    },
    {
        displayName: 'Endpoint',
        columnName: ['endpoint', 'name']
    },
    {
        displayName: 'Enabled',
        columnName: 'enabled',
        formatter(value) {
            return <EnabledIcon value={value} />;
        }
    }
]);

function updateList(list, item, values, position = 0) {
    const subscriber = item == null ? Subscriber(values) : item.merge(values);

    return list == null ? List([subscriber]) : list.set(position, subscriber);
}

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
            item: Subscriber(),
            itemIndex: value ? value.size : 0
        });
    },

    _onEdit(selectedIndex) {
        const value = this.getValue();

        this.setState({
            mode: MODES.FORM,
            item: value.get(selectedIndex),
            itemIndex: selectedIndex
        });
    },

    _onDelete(selected) {
        if (selected === 'all') {
            this.setValue(this.getValue().clear());
            return;
        }

        this.setValue(this.getValue().toSeq().filter((_, idx) => {
            return includes(selected, idx) === false;
        }).toList());
    },

    _onFormSave(values) {
        this.setState({
            mode: MODES.LIST,
            item: null,
            itemIndex: null
        });

        this.setValue(updateList(this.getValue(), this.state.item, values, this.state.itemIndex));
    },


    _onFormDelete() {
        const idx = this.state.itemIndex;

        if (idx == null) {
            return;
        }

        this.setState({
            mode: MODES.LIST,
            item: null,
            itemIndex: null
        });

        this.setValue(this.getValue().delete(idx));
    },


    _onFormCancel() {
        this.setState({
            mode: MODES.LIST,
            item: null,
            itemIndex: null
        });
    },

    _renderList() {
        const value = this.getValue();
        const quantity = value ? value.size : 0;

        return (
            <DataList
                title="Subscribers"
                items={this.getValue()}
                columns={DATA_LIST_COLUMNS}
                editable
                loading={this.props.loading}
                quantity={quantity}
                onCreate={this._onCreate}
                onEdit={this._onEdit}
                onDelete={this._onDelete}
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
