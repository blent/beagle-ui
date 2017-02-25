import React from 'react';
import Griddle from 'griddle-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';

export default React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        tableClassName: React.PropTypes.string,
        columns: React.PropTypes.array,
        columnMetadata: React.PropTypes.array,
        rowMetadata: React.PropTypes.object,
        rows: React.PropTypes.array,
        noDataMessage: React.PropTypes.string,
        noDataClassName: React.PropTypes.string,
        resultsPerPage: React.PropTypes.number,
        customNoDataComponent: React.PropTypes.element,
        showFilter: React.PropTypes.bool,
        useCustomRowComponent: React.PropTypes.bool,
        customRowComponent: React.PropTypes.element,
        customRowComponentClassName: React.PropTypes.string,
        onRowClick: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin,
        DynamicEventsMixin
    ],

    render() {
        return (
            <Griddle
                columns={this.props.columns}
                columnMetadata={this.props.columnMetadata}
                results={this.props.rows}
                rowMetadata={this.props.rowMetadata}
                noDataMessage={this.props.noDataMessage}
                noDataClassName={this.props.noDataClassName}
                resultsPerPage={this.props.resultsPerPage}
                customNoDataComponent={this.props.customNoDataComponent}
                gridClassName={this.props.className}
                tableClassName={this.props.tableClassName}
                showFilter={this.props.showFilter}
                useCustomRowComponent={this.props.useCustomRowComponent}
                customRowComponent={this.props.customRowComponent}
                customRowComponentClassName={this.props.customRowComponentClassName}
                onRowClick={this.props.onRowClick}
            />
        );
    }
});
