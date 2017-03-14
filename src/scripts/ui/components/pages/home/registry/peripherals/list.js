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
import DataTable from '../../../../common/data-table/data-table';
import {
    card as cardCss,
    cardLoading as cardLoadingCss,
    menuIcon as menuIconCss
} from './list.css';

const DATA_PATH = ['data', 'result', 'items'];
const QUANTITY_PATH = ['data', 'result', 'quantity'];
const COLUMNS = [
    'key',
    'kind',
    'proximity',
    'registered',
    'time'
];

const CSS_ICON_ADD = cn('fa', 'fa-plus', menuIconCss);
const CSS_ICON_REMOVE = cn('fa', 'fa-minus', menuIconCss);
const ORIGIN_ANCHOR = { horizontal: 'left', vertical: 'top' };

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        // actions: React.PropTypes.object
    },

    getInitialState() {
        return {
            value: 1
        };
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

    render() {
        const cardClassNames = cn({
            [cardCss]: true,
            [cardLoadingCss]: this._isLoading()
        });


        return (
            <Card className={cardClassNames}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Registered peripherals" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={ORIGIN_ANCHOR}
                            targetOrigin={ORIGIN_ANCHOR}
                        >
                            <MenuItem
                                leftIcon={<FontIcon className={CSS_ICON_ADD} />}
                                primaryText="Create"
                            />
                            <MenuItem
                                leftIcon={<FontIcon className={CSS_ICON_REMOVE} />}
                                primaryText="Remove"
                            />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                <DataTable
                    selectable
                    multiSelectable
                    rows={this._getItems()}
                    total={this._getQuantity()}
                    columns={COLUMNS}
                    isLoading={this._isLoading()}
                />
            </Card>
        );
    }
});
