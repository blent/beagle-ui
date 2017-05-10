/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cn from 'classnames';
import {
    Card
} from 'material-ui/Card';
import Loader from '../../common/loader/loader';
import Toolbar from './toolbar';
import {
    card as cardCss
} from './form.css';

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        className: React.PropTypes.string,
        children: React.PropTypes.any,
        loading: React.PropTypes.bool,
        submit: React.PropTypes.bool,
        hideSave: React.PropTypes.bool,
        hideDelete: React.PropTypes.bool,
        hideCancel: React.PropTypes.bool,
        disableSave: React.PropTypes.bool,
        disableDelete: React.PropTypes.bool,
        disableCancel: React.PropTypes.bool,
        onSaveClick: React.PropTypes.func,
        onDeleteClick: React.PropTypes.func,
        onCancelClick: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin
    ],

    _renderLoader() {
        return (
            <Loader
                type="linear"
                hidden={!this.props.loading}
            />
        );
    },

    _renderToolbar() {
        return (
            <Toolbar
                text={this.props.title}
                loading={this.props.loading}
                hideSave={this.props.hideSave}
                hideDelete={this.props.hideDelete}
                hideCancel={this.props.hideCancel}
                disableSave={this.props.disableSave}
                disableDelete={this.props.disableDelete}
                disableCancel={this.props.disableCancel}
                onSaveClick={this.props.onSaveClick}
                onDeleteClick={this.props.onDeleteClick}
                onCancelClick={this.props.onCancelClick}
                submit={this.props.submit}
            />
        );
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
                <div
                    className={className}
                >
                    {this.props.children}
                </div>
            </Card>
        );
    }
});
