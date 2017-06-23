/* eslint-disable react/prop-types */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const CN_CHECK = 'fa fa-check';
const CN_MINUS = 'fa fa-minus';
const iconStyles = {
    fontSize: 14
};

export default function BooleanIcon({ value }) {
    let className = CN_CHECK;

    if (value === false) {
        className = CN_MINUS;
    }

    return (
        <FontIcon
            className={className}
            style={iconStyles}
        />
    );
}
