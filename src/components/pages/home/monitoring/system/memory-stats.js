/* eslint-disable react/prop-types */
import React from 'react';
import Paper from 'material-ui/Paper';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts';
import map from 'lodash/map';
import {
    formatBytes
} from '../../../../../utils/units';
import {
    RED,
    BLUE,
    GREEN
} from './colors';

const EMPTY_DATA = [];
const COLOR_USED = RED;
const COLOR_AVAILABLE = BLUE;
const COLORS = [COLOR_AVAILABLE, COLOR_USED];
const PALETTE = map(COLORS, (color, idx) => <Cell key={idx} fill={color} />);
const RADIAN = Math.PI / 180;
const TOOLTIP_STYLE = {
    minHeight: 90,
    minWidth: 180,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
};

function renderLabel({
    cx, cy, midAngle, innerRadius, outerRadius, percent
}) {
    const radius = (innerRadius + ((outerRadius - innerRadius) * 0.3));
    const x = (cx + (radius * Math.cos(-midAngle * RADIAN)));
    const y = cy + (radius * Math.sin(-midAngle * RADIAN));

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}

function renderTooltipContent(data) {
    if (data.payload.length === 0) {
        return null;
    }

    const current = data.payload[0].payload;
    const color = current.name === 'Used' ? RED : BLUE;

    return (
        <Paper zDepth={3} style={TOOLTIP_STYLE}>
            <p>
                <span>{current.name}: </span>
                <span style={{ color }}>{formatBytes(current.value)}</span>
            </p>
            <p>
                <span>Total: </span>
                <span style={{ color: GREEN }}>{formatBytes(current.total)}</span>
            </p>
        </Paper>
    );
}

function renderLegend(data) {
    if (data == null) {
        return null;
    }

    return (
        <p>
            Used {formatBytes(data.used)} ({Math.round(data.usedPercent)}%) of {formatBytes(data.total)}
        </p>
    );
}

function renderBar(data) {
    const stat = data != null ? [
        { name: 'Available', value: data.available, total: data.total },
        { name: 'Used', value: data.used, total: data.total }
    ] : EMPTY_DATA;

    return (
        <PieChart
            height={200}
            width={200}
        >
            <Pie
                data={stat}
                labelLine={false}
                label={renderLabel}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
            >
                {PALETTE}
            </Pie>
            <Tooltip content={renderTooltipContent} />
        </PieChart>
    );
}

export default function MemoryStats({ data }) {
    return (
        <div>
            <h4>Memory</h4>
            {renderLegend(data)}
            {renderBar(data)}
        </div>
    );
}
