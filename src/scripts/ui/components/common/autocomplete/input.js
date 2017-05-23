/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AutoComplete from 'material-ui/AutoComplete';

export default React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        dataSource: React.PropTypes.array,
        dataShape: React.PropTypes.object,
        label: React.PropTypes.string,
        searchText: React.PropTypes.string,
        errorText: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        fullWidth: React.PropTypes.bool,
        loading: React.PropTypes.bool,
        onSelect: React.PropTypes.func,
        onSearch: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin
    ],

    getDefaultProps() {
        return {
            fullWidth: false
        };
    },

    render() {
        return (
            <AutoComplete
                name={this.props.name}
                dataSource={this.props.dataSource}
                dataSourceConfig={this.props.dataShape}
                floatingLabelText={this.props.label}
                disabled={this.props.disabled}
                searchText={this.props.searchText}
                errorText={this.props.errorText}
                fullWidth={this.props.fullWidth}
                onNewRequest={this.props.onSelect}
                onUpdateInput={this.props.onSearch}
            />
        );
    }
});
