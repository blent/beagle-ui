/* eslint-disable react/prop-types */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const CN_ICON = 'fa fa-refresh';
const DEFAULT_STYLE = {
    fontSize: 14
};

export default function RefreshIcon({ disabled, fontSize }) {
    const style = fontSize == null ? DEFAULT_STYLE : { fontSize };

    return (
        <FontIcon
            disabled={disabled}
            className={CN_ICON}
            style={style}
        />
    );
}
