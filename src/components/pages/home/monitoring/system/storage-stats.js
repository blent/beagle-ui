/* eslint-disable react/prop-types */
import React from 'react';
import { List } from 'immutable';
import Paper from 'material-ui/Paper';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import {
    formatBytes
} from '../../../../../utils/units';
import {
    RED,
    BLUE,
    GREEN
} from './colors';

const EMPTY_DATA = List();
const TOOLTIP_STYLE = {
    minHeight: 150,
    minWidth: 180,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
};

function formatterYAxis(value) {
    return formatBytes(value);
}

function comparator(a, b) {
    if (a < b) { return 1; }
    if (a > b) { return -1; }

    return 0;
}

function normalizeData(data) {
    return data.toSeq().sortBy(i => i.total, comparator);
}

function formatData(data) {
    return data.map((item, idx) => {
        return {
            name: idx,
            path: item.path,
            used: item.used,
            available: item.available,
            total: item.total
        };
    }).toJS();
}

function getYAxisDomain(data) {
    const lastIdx = data.size - 1;

    return data.reduce((res, item, idx) => {
        if (idx === 0 || idx === lastIdx) {
            res.push(item.total);
        }

        return res;
    }, []).reverse();
}

function renderTooltipContent(data) {
    if (data == null || data.payload == null) {
        return null;
    }

    if (data.payload.length === 0) {
        return null;
    }

    const [used, available] = data.payload;

    return (
        <Paper zDepth={3} style={TOOLTIP_STYLE}>
            <p>
                <span>{used.payload.path}</span>
            </p>
            <p>
                <span>Available: </span>
                <span style={{ color: BLUE }}>{formatBytes(available.value)}</span>
            </p>
            <p>
                <span>Used: </span>
                <span style={{ color: RED }}>{formatBytes(used.value)}</span>
            </p>
            <p>
                <span>Total: </span>
                <span style={{ color: GREEN }}>{formatBytes(used.payload.total)}</span>
            </p>
        </Paper>
    );
}

// function renderTick({ x, y, width, height, payload }) {
//     return (
//         <text
//             x={x}
//             y={y}
//             width={width}
//             height={height}
//             stroke="none"
//             textAnchor="end"
//             dominantBaseline="central"
//             fontSize="14"
//         >
//             {formatBytes(payload.value)}
//         </text>
//     );
// }

function renderChart(data = EMPTY_DATA) {
    const actualData = normalizeData(data || EMPTY_DATA);

    return (
        <BarChart
            height={300}
            width={300}
            data={formatData(actualData)}
        >
            <XAxis
                dataKey="name"
            />
            <YAxis
                dataKey="used"
                domain={getYAxisDomain(actualData)}
                tickFormatter={formatterYAxis}
                hide
            />
            <Tooltip
                content={renderTooltipContent}
            />
            <Bar
                dataKey="used"
                stackId="a"
                fill={RED}
            />
            <Bar
                dataKey="available"
                stackId="a"
                fill={BLUE}
            />
        </BarChart>
    );
}

export default function StorageStats({ data }) {
    return (
        <div>
            <h4>Storage</h4>
            {renderChart(data)}
        </div>
    );
}
