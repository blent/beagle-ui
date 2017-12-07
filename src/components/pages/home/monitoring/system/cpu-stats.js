/* eslint-disable react/prop-types */
import React from 'react';
import Paper from 'material-ui/Paper';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import {
    getUsageColor
} from './colors';
import ColoredBar from './common/colored-bar';

const Y_AXIS_DOMAIN = [0, 100];
const EMPTY_DATA = [];
const TOOLTIP_STYLE = {
    minHeight: 80,
    minWidth: 100,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
};

function formatterYAxis(value) {
    return `${value}%`;
}

function formatData(data) {
    if (data == null) {
        return EMPTY_DATA;
    }

    return data.map((i, idx) => {
        return {
            name: idx + 1,
            usage: Math.round(i)
        };
    }).toJS();
}

function renderTooltipContent(data) {
    if (data == null || data.payload == null) {
        return null;
    }

    if (data.payload.length === 0) {
        return null;
    }

    const item = data.payload[0].payload;
    const color = getUsageColor(item.usage);

    return (
        <Paper zDepth={3} style={TOOLTIP_STYLE}>
            <p>CPU {item.name}</p>
            <p style={{ color }}>{item.usage}%</p>
        </Paper>
    );
}

function renderChart(data) {
    return (
        <BarChart
            height={300}
            width={300}
            data={formatData(data)}
        >
            <XAxis
                dataKey="name"
            />
            <YAxis
                type="number"
                domain={Y_AXIS_DOMAIN}
                dataKey="usage"
                tickFormatter={formatterYAxis}
            />
            <Tooltip
                content={renderTooltipContent}
            />
            <Bar
                dataKey="usage"
                shape={ColoredBar}
            />
        </BarChart>
    );
}

export default function CpuStats({ data }) {
    return (
        <div>
            <h4>CPU</h4>
            {renderChart(data)}
        </div>
    );
}
