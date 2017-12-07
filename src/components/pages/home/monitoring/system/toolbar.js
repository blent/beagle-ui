/* eslint-disable react/forbid-prop-types, react/prop-types */
import React from 'react';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle
} from 'material-ui/Toolbar';
import RefreshIconButton from '../../../../common/buttons/refresh';

export default function SystemToolbar(props) {
    return (
        <Toolbar>
            <ToolbarGroup>
                <ToolbarTitle text="System stats" />
            </ToolbarGroup>
            <ToolbarGroup>
                <RefreshIconButton
                    disabled={props.loading}
                    onClick={props.onRefreshClick}
                    fontSize={20}
                />
            </ToolbarGroup>
        </Toolbar>
    );
}
