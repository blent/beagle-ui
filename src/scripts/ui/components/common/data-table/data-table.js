import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table';
import isObject from 'lodash/isObject';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';
import Loader from '../loader/loader';
import Pager from '../pager/pager';

const WRAPPER_STYLE = {
    minHeight: '100px'
};
export default React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        tableClassName: React.PropTypes.string,
        selectable: React.PropTypes.bool,
        fixedHeader: React.PropTypes.bool,
        multiSelectable: React.PropTypes.bool,
        columns: React.PropTypes.array,
        columnMetadata: React.PropTypes.array,
        rows: React.PropTypes.object,
        currentPage: React.PropTypes.number,
        perPage: React.PropTypes.number,
        total: React.PropTypes.number,
        onNextPage: React.PropTypes.func,
        onPrevPage: React.PropTypes.func,
        onGotoPage: React.PropTypes.func,
        isLoading: React.PropTypes.bool
    },

    mixins: [
        PureRenderMixin,
        DynamicEventsMixin
    ],

    getDefaultProps() {
        return {
            selectable: false,
            fixedHeader: true,
            multiSelectable: false,
            currentPage: 1,
            perPage: 10,
            total: 1
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

    _hasRows() {
        return this.props.rows && this.props.rows.size > 0;
    },

    _renderColumns() {
        return map(this._columns, (metadata) => {
            if (isObject(metadata)) {
                return (
                    <TableHeaderColumn
                        key={metadata.columnName}
                        tooltip={metadata}
                    >
                        {metadata.displayName || metadata.columnName}
                    </TableHeaderColumn>
                );
            }

            return (
                <TableHeaderColumn
                    key={metadata}
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

        if (!this._hasRows()) {
            return null;
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

    _renderPager() {
        if (!this._hasRows()) {
            return null;
        }

        return (
            <Pager
                currentPage={this.props.currentPage}
                perPage={this.props.perPage}
                total={this.props.total}
                onGotoPage={this.props.onGotoPage}
                onPrev={this.props.onPrevPage}
                onNext={this.props.onNextPage}
            />
        );
    },

    render() {
        return (
            <div className={this.props.className}>
                <Table
                    className={this.props.tableClassName}
                    selectable={this.props.selectable}
                    multiSelectable={this.props.multiSelectable}
                    fixedHeader={this.props.fixedHeader}
                    wrapperStyle={WRAPPER_STYLE}
                >
                    <TableHeader>
                        <TableRow>
                            {this._renderColumns()}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this._renderRows()}
                    </TableBody>
                    <TableFooter>
                        {this._renderPager()}
                    </TableFooter>
                </Table>
            </div>
        );
    }
});
