/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cn from 'classnames';
import DataSourceMixin from '../../../../mixins/data-source-mixin';
import QuerySourceMixin from '../../../../mixins/query-source-mixin';
import Card from '../../../../common/card/card';
import Toolbar from './toolbar';
import GeneralStats from './general-stats';
import CpuStats from './cpu-stats';
import MemoryStats from './memory-stats';
import StorageStats from './storage-stats';
import {
    pageRow as pageRowCss
} from './page.css';

const PATH_CPU = ['cpu'];
const PATH_MEMORY = ['memory'];
const PATH_STORAGE = ['storage'];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    mixins: [
        PureRenderMixin,
        DataSourceMixin,
        QuerySourceMixin
    ],

    _onRefresh() {
        this.props.actions.find();
    },

    _renderToolbar() {
        return (
            <Toolbar
                onRefreshClick={this._onRefresh}
            />
        );
    },

    render() {
        const rowClassName = cn('row', pageRowCss);

        return (
            <Card
                loading={this.isLoading()}
                toolbarElement={this._renderToolbar()}
            >
                <div>
                    <div className="col-xs-12">
                        <GeneralStats
                            data={this.getQueryResult()}
                        />
                    </div>
                </div>
                <div className={rowClassName}>
                    <div className="col-xs-4">
                        <CpuStats
                            data={this.getFromQueryResult(PATH_CPU)}
                        />
                    </div>
                    <div className="col-xs-4">
                        <MemoryStats
                            data={this.getFromQueryResult(PATH_MEMORY)}
                        />
                    </div>
                    <div className="col-xs-4">
                        <StorageStats
                            data={this.getFromQueryResult(PATH_STORAGE)}
                        />
                    </div>
                </div>
            </Card>
        );
    }
});
