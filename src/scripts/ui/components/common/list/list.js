/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
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
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';
import DataTable from '../data-table/data-table';
import {
    menuIcon as menuIconCss
} from './list.css';

const CSS_ICON_CREATE = cn('fa', 'fa-plus', menuIconCss);
const CSS_ICON_REMOVE = cn('fa', 'fa-minus', menuIconCss);
const CSS_ICON_EDIT = cn('fa', 'fa-pencil-square-o', menuIconCss);
const ORIGIN_ANCHOR = { horizontal: 'left', vertical: 'top' };

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        columns: React.PropTypes.array,
        editable: React.PropTypes.bool,
        items: React.PropTypes.object,
        quantity: React.PropTypes.number,
        loading: React.PropTypes.bool,
        onCreate: React.PropTypes.func,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onNextPage: React.PropTypes.func,
        onPrevPage: React.PropTypes.func,
        onGotoPage: React.PropTypes.func
    },

    mixins: [
        DynamicEventsMixin,
        PureRenderMixin
    ],

    getDefaultProps() {
        return {
            quantity: 0
        };
    },

    getInitialState() {
        return {
            selected: 'none'
        };
    },

    componentWillMount() {
        this._onCreateClick = this.emit('onCreate');
        this._onNextPageClick = this.emit('onNextPage');
        this._onPrevPageClick = this.emit('onPrevPage');
        this._onGotoPageClick = this.emit('onGotoPage');
    },

    _onRowSelection(selected) {
        this.setState({ selected });
    },

    _onEditClick() {
        if (this.props.onEdit) {
            const selected = this.state.selected[0];

            if (isNil(selected)) {
                return;
            }

            this.props.onEdit(selected);
        }
    },

    _onDeleteClick() {
        if (!this.state.selected || this.state.selected.length === 0) {
            return;
        }

        if (this.state.selected === 'none') {
            return;
        }

        if (!this.props.onDelete) {
            return;
        }

        if (this.state.selected === 'all') {
            this.props.onDelete(this.props.items);
            return;
        }

        this.props.onDelete(List(map(this.state.selected, (idx) => {
            return this.props.items.get(idx);
        })));
    },

    _renderHeader() {
        if (this.props.editable) {
            let menuItems = null;

            if (isEmpty(this.state.selected) || this.state.selected === 'none') {
                menuItems = [
                    <MenuItem
                        key="create"
                        leftIcon={<FontIcon className={CSS_ICON_CREATE} />}
                        primaryText="Create"
                        onClick={this._onCreateClick}
                    />
                ];
            } else {
                menuItems = [];

                if (isArray(this.state.selected) && this.state.selected.length === 1) {
                    menuItems.push(
                        <MenuItem
                            key="edit"
                            leftIcon={<FontIcon className={CSS_ICON_EDIT} />}
                            primaryText="Edit"
                            onClick={this._onEditClick}
                        />
                    );
                }

                menuItems.push(
                    <MenuItem
                        key="remove"
                        leftIcon={<FontIcon className={CSS_ICON_REMOVE} />}
                        primaryText="Remove"
                        onClick={this._onDeleteClick}
                    />
                );
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
            'card-loading': this.props.loading
        });

        return (
            <Card className={cardClassNames}>
                {this._renderHeader()}
                <DataTable
                    rows={this.props.items}
                    total={this.props.quantity}
                    columns={this.props.columns}
                    loading={this.props.loading}
                    clickable={this.props.editable}
                    selectable={this.props.editable}
                    multiSelectable={this.props.editable}
                    onRowSelection={this._onRowSelection}
                    onNextPage={this._onNextPageClick}
                    onPrevPage={this._onPrevPageClick}
                    onGotoPage={this._onGotoPageClick}
                />
            </Card>
        );
    }
});
