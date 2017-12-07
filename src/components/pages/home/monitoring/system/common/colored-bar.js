/* eslint-disable react/prop-types */
import React from 'react';
import {
    getUsageColor
} from '../colors';

function getBarPath(x, y, width, height) {
    return `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
}

export default function ColoredBar(props) {
    const {
        x, y, width, height
    } = props;

    return (
        <path
            fill={getUsageColor(props.usage)}
            width={width}
            height={height}
            x={x}
            y={y}
            className="recharts-rectangle"
            d={getBarPath(x, y, width, height)}
        />
    );
}
