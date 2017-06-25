/* eslint-disable react/prop-types */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const CN_TRUE = 'fa fa-toggle-on';
const CN_FALSE = 'fa fa-toggle-off';
const iconStyles = {
    fontSize: 14
};

export default function BooleanIcon({ value }) {
    let className = CN_TRUE;

    if (!value) {
        className = CN_FALSE;
    }

    return (
        <FontIcon
            className={className}
            style={iconStyles}
        />
    );
}
