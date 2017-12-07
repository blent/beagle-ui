/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import map from 'lodash/map';
import DataSourceMixin from '../../mixins/data-source-mixin';
import QuerySourceMixin from '../../mixins/query-source-mixin';
import List from './list';

const DATA_PATH = ['data', 'result', 'items'];
const QUANTITY_PATH = ['data', 'result', 'quantity'];

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        columns: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        editable: React.PropTypes.bool,
        source: React.PropTypes.object,
        actions: React.PropTypes.object,
    },

    mixins: [
        PureRenderMixin,
        DataSourceMixin,
        QuerySourceMixin
    ],

    getDefaultProps() {
        return {
            editable: false
        };
    },

    _onCreate() {
        this.props.actions.create();
    },

    _onEdit(selected) {
        this.props.actions.edit(this._getItems().get(selected));
    },

    _onDelete(selected) {
        const items = this._getItems();

        if (selected === 'all') {
            this.props.actions.delete(items);
            return;
        }

        this.props.actions.delete(map(selected, i => items.get(i)));
    },

    _getItems() {
        return this.props.source.getIn(DATA_PATH);
    },

    _getQuantity() {
        return this.props.source.getIn(QUANTITY_PATH);
    },

    render() {
        return (
            <List
                title={this.props.title}
                columns={this.props.columns}
                editable={this.props.editable}
                items={this._getItems()}
                quantity={this._getQuantity()}
                loading={this.isLoading()}
                onCreate={this._onCreate}
                onEdit={this._onEdit}
                onDelete={this._onDelete}
            />
        );
    }
});
