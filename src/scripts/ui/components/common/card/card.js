/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cn from 'classnames';
import {
    Card,
    CardHeader
} from 'material-ui/Card';
import Loader from '../../common/loader/loader';
import {
    card as cardCss
} from './card.css';

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        className: React.PropTypes.string,
        children: React.PropTypes.any,
        loading: React.PropTypes.bool,
        toolbarElement: React.PropTypes.element
    },

    mixins: [
        PureRenderMixin
    ],

    _renderToolbar() {
        const toolbarElement = this.props.toolbarElement;

        if (toolbarElement == null) {
            return null;
        }

        return toolbarElement;
    },

    _renderLoader() {
        return (
            <Loader
                type="linear"
                hidden={!this.props.loading}
            />
        );
    },

    _renderHeader() {
        if (this.props.title == null) {
            return null;
        }

        return <CardHeader title={this.props.title} />;
    },

    render() {
        const className = cn({
            card: true,
            [cardCss]: true,
            'card-loading': this.props.loading,
            [this.props.className]: true
        });

        return (
            <Card
                className={className}
            >
                {this._renderToolbar()}
                {this._renderLoader()}
                {this._renderHeader()}
                <div
                    className={className}
                >
                    {this.props.children}
                </div>
            </Card>
        );
    }
});
