/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Card,
    CardTitle
} from 'material-ui/Card';
import cn from 'classname';
import DataTable from '../../../../common/data-table/data-table';
import {
    card as cardCss,
    cardLoading as cardLoadingCss
} from './list.css';

const DATA_PATH = ['data', 'result'];
const COLUMNS = [
    'key',
    'kind',
    'proximity',
    'registered',
    'time'
];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        // actions: React.PropTypes.object
    },

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    _getItems() {
        return this.props.source.getIn(DATA_PATH);
    },

    render() {
        const cardClassNames = cn({
            [cardCss]: true,
            [cardLoadingCss]: this._isLoading()
        });

        return (
            <Card className={cardClassNames}>
                <CardTitle title={'Active peripherals'} />
                <DataTable
                    rows={this._getItems()}
                    columns={COLUMNS}
                    isLoading={this._isLoading()}
                />
            </Card>
        );
    }
});
