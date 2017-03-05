import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import isObject from 'lodash/isObject';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';
import Loader from '../loader/loader';

export default React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        tableClassName: React.PropTypes.string,
        columns: React.PropTypes.array,
        columnMetadata: React.PropTypes.array,
        rows: React.PropTypes.object,
        noDataMessage: React.PropTypes.string,
        isLoading: React.PropTypes.bool
    },

    mixins: [
        PureRenderMixin,
        DynamicEventsMixin
    ],

    getDefaultProps() {
        return {
            noDataMessage: 'No data'
        };
    },

    componentWillMount() {
        this._buildColumns(this.props.columns, this.props.columnMetadata);
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.columnMetadata !== nextProps.columnMetadata) {
            this._buildColumns(nextProps.columns, nextProps.columnMetadata);
        } else if (this.props.columns !== nextProps.columns) {
            this._buildColumns(nextProps.columns, nextProps.columnMetadata);
        }
    },

    _columns: null,

    _buildColumns(columns, metadata) {
        this._columns = {};

        forEach(columns, (name) => {
            this._columns[name] = name;
        });

        forEach(metadata, (meta) => {
            if (this._columns[meta.columnName]) {
                this._columns = meta;
            }
        });
    },

    _renderColumns() {
        return map(this._columns, (metadata) => {
            if (isObject(metadata)) {
                return (
                    <TableHeaderColumn
                        tooltip={metadata}
                    >
                        {metadata.displayName || metadata.columnName}
                    </TableHeaderColumn>
                );
            }

            return (
                <TableHeaderColumn
                    tooltip={metadata}
                >
                    {metadata}
                </TableHeaderColumn>
            );
        });
    },

    _renderRow(row) {
        return map(this._columns, (meta, idx) => {
            const path = isObject(meta) ? meta.columnName : meta;
            const key = `${idx}_col`;
            return (
                <TableRowColumn key={key}>
                    {row.get(path)}
                </TableRowColumn>
            );
        });
    },

    _renderRows() {
        if (this.props.isLoading) {
            return <Loader />;
        }

        if (!this.props.rows || this.props.rows.size === 0) {
            return this.props.noDataMessage;
        }

        return this.props.rows.map((row, idx) => {
            const key = `${idx}_row`;

            return (
                <TableRow key={key}>
                    {this._renderRow(row)}
                </TableRow>
            );
        });
    },

    render() {
        return (
            <div className={this.props.className}>
                <Table calssName={this.props.tableClassName}>
                    <TableHeader>
                        <TableRow>
                            {this._renderColumns()}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this._renderRows()}
                    </TableBody>
                </Table>
            </div>
        );
    }
});
