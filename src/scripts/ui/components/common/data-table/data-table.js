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
import cn from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';
import Loader from '../loader/loader';
import Pager from '../pager/pager';
import {
    clickable as clickabaleCss
} from './data-table.css';

const WRAPPER_STYLE = {
    minHeight: '100px'
};
export default React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        tableClassName: React.PropTypes.string,
        clickable: React.PropTypes.bool,
        selectable: React.PropTypes.bool,
        multiSelectable: React.PropTypes.bool,
        fixedHeader: React.PropTypes.bool,
        columns: React.PropTypes.array,
        columnMetadata: React.PropTypes.array,
        rows: React.PropTypes.object,
        currentPage: React.PropTypes.number,
        perPage: React.PropTypes.number,
        total: React.PropTypes.number,
        onNextPage: React.PropTypes.func,
        onPrevPage: React.PropTypes.func,
        onGotoPage: React.PropTypes.func,
        loading: React.PropTypes.bool,
        onRowSelection: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin,
        DynamicEventsMixin
    ],

    getDefaultProps() {
        return {
            clickable: false,
            selectable: false,
            multiSelectable: false,
            fixedHeader: true,
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
                    >
                        {metadata.displayName || metadata.columnName}
                    </TableHeaderColumn>
                );
            }

            return (
                <TableHeaderColumn
                    key={metadata}
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
                    <span>{row.get(path)}</span>
                </TableRowColumn>
            );
        });
    },

    _renderRows() {
        if (!this._hasRows()) {
            return null;
        }

        const className = cn({
            [clickabaleCss]: this.props.clickable
        });

        return this.props.rows.map((row, idx) => {
            const key = `${idx}_row`;

            return (
                <TableRow
                    key={key}
                    className={className}
                >
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

    _renderLoader() {
        return (
            <Loader
                type="linear"
                hidden={!this.props.loading}
            />
        );
    },

    render() {
        return (
            <div className={this.props.className}>
                {this._renderLoader()}
                <Table
                    className={this.props.tableClassName}
                    selectable={this.props.selectable}
                    multiSelectable={this.props.multiSelectable}
                    fixedHeader={this.props.fixedHeader}
                    wrapperStyle={WRAPPER_STYLE}
                    onRowSelection={this.props.onRowSelection}
                >
                    <TableHeader>
                        <TableRow>
                            {this._renderColumns()}
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        showRowHover={this.props.clickable}
                    >
                        {this._renderRows()}
                    </TableBody>
                </Table>
                {this._renderPager()}
            </div>
        );
    }
});
