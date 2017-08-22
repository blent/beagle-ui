/* eslint-disable react/prop-types */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from '../icons/refresh';

export default function RefreshButton({ disabled, onClick, fontSize }) {
    return (
        <IconButton
            disabled={disabled}
            onClick={onClick}
        >
            <RefreshIcon fontSize={fontSize} />
        </IconButton>
    );
}
