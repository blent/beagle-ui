/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Card
} from 'material-ui/Card';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import cn from 'classnames';
import { List } from 'immutable';
import map from 'lodash/map';
import DataSourceMixin from '../../mixins/data-source-mixin';
import QuerySourceMixin from '../../mixins/query-source-mixin';
import DataTable from '../data-table/data-table';
import {
    menuIcon as menuIconCss
} from './list.css';

const DATA_PATH = ['data', 'result', 'items'];
const QUANTITY_PATH = ['data', 'result', 'quantity'];
const CSS_ICON_CREATE = cn('fa', 'fa-plus', menuIconCss);
const CSS_ICON_REMOVE = cn('fa', 'fa-minus', menuIconCss);
const ORIGIN_ANCHOR = { horizontal: 'left', vertical: 'top' };

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        columns: React.PropTypes.array,
        editable: React.PropTypes.bool,
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    mixins: [
        DataSourceMixin,
        QuerySourceMixin
    ],

    getInitialState() {
        return {
            selected: 'none'
        };
    },

    _onRowSelection(selected) {
        this.setState({ selected });
    },

    _onCreateClick() {
        this.props.actions.create();
    },

    _onDeleteClick() {
        if (!this.state.selected || this.state.selected.length === 0) {
            return;
        }

        if (this.state.selected === 'none') {
            return;
        }

        if (this.state.selected === 'all') {
            this.props.actions.delete(this._getItems());
            return;
        }

        this.props.actions.delete(List(map(this.state.selected, (idx) => {
            return this._getItems().get(idx);
        })));
    },

    _getItems() {
        return this.props.source.getIn(DATA_PATH);
    },

    _getQuantity() {
        return this.props.source.getIn(QUANTITY_PATH);
    },

    _renderHeader() {
        if (this.props.editable) {
            let menuItems = null;

            if (!this.state.selected || this.state.selected === 'none') {
                menuItems = [
                    <MenuItem
                        key="create"
                        leftIcon={<FontIcon className={CSS_ICON_CREATE} />}
                        primaryText="Create"
                        onClick={this._onCreateClick}
                    />
                ];
            } else {
                menuItems = [
                    <MenuItem
                        key="remove"
                        leftIcon={<FontIcon className={CSS_ICON_REMOVE} />}
                        primaryText="Remove"
                        onClick={this._onDeleteClick}
                    />
                ];
            }

            return (
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={this.props.title} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={ORIGIN_ANCHOR}
                            targetOrigin={ORIGIN_ANCHOR}
                        >
                            {menuItems}
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            );
        }

        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text={this.props.title} />
                </ToolbarGroup>
            </Toolbar>
        );
    },

    render() {
        const cardClassNames = cn({
            card: true,
            'card-loading': this.isLoading()
        });

        return (
            <Card className={cardClassNames}>
                {this._renderHeader()}
                <DataTable
                    rows={this._getItems()}
                    total={this._getQuantity()}
                    columns={this.props.columns}
                    isLoading={this.isLoading()}
                    clickable={this.props.editable}
                    selectable={this.props.editable}
                    multiSelectable={this.props.editable}
                    onRowSelection={this._onRowSelection}
                />
            </Card>
        );
    }
});
