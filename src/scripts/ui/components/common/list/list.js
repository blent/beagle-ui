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

    _onCreateClick() {
        this.props.actions.create();
    },

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    _getItems() {
        return this.props.source.getIn(DATA_PATH);
    },

    _getQuantity() {
        return this.props.source.getIn(QUANTITY_PATH);
    },

    _renderHeader() {
        if (this.props.editable) {
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
                            <MenuItem
                                leftIcon={<FontIcon className={CSS_ICON_CREATE} />}
                                primaryText="Create"
                                onClick={this._onCreateClick}
                            />
                            <MenuItem
                                leftIcon={<FontIcon className={CSS_ICON_REMOVE} />}
                                primaryText="Remove"
                            />
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
            'card-loading': this._isLoading()
        });

        return (
            <Card className={cardClassNames}>
                {this._renderHeader()}
                <DataTable
                    rows={this._getItems()}
                    total={this._getQuantity()}
                    columns={this.props.columns}
                    isLoading={this._isLoading()}
                />
            </Card>
        );
    }
});
