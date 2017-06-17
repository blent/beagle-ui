/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DataSourceMixin from '../../mixins/data-source-mixin';
import QuerySourceMixin from '../../mixins/query-source-mixin';
import Input from './input';

const DEFAULT_DATA_SOURCE = [];

export default React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        source: React.PropTypes.object,
        actions: React.PropTypes.object,
        shape: React.PropTypes.object,
        label: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        fullWidth: React.PropTypes.bool,
        searchText: React.PropTypes.string,
        searchParam: React.PropTypes.string,
        anchorOrigin: React.PropTypes.object,
        targetOrigin: React.PropTypes.object,
        onSelect: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin,
        DataSourceMixin,
        QuerySourceMixin
    ],

    getDefaultProps() {
        return {
            searchParam: 'value',
            fullWidth: false
        };
    },

    _onSearch(text) {
        this.props.actions.find({
            [this.props.searchParam]: `${text}*`
        });
    },

    _getDataSource() {
        const queryResult = this.getQueryResult();

        if (queryResult == null) {
            return DEFAULT_DATA_SOURCE;
        }

        const items = queryResult.get('items');

        if (items == null || items.size === 0) {
            return DEFAULT_DATA_SOURCE;
        }

        return items.toJS();
    },

    _onSelect(chosenRequest) {
        this.props.onSelect(chosenRequest);
    },

    render() {
        return (
            <Input
                name={this.props.name}
                dataShape={this.props.shape}
                dataSource={this._getDataSource()}
                disabled={this.props.disabled}
                loading={this.isLoading()}
                errorText={this.getErrorText()}
                onSelect={this._onSelect}
                onSearch={this._onSearch}
                fullWidth={this.props.fullWidth}
                anchorOrigin={this.props.anchorOrigin}
                targetOrigin={this.props.targetOrigin}
            />
        );
    }
});
