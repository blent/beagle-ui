/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DataSourceMixin from '../../mixins/data-source-mixin';
import Form from './form';

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        source: React.PropTypes.object,
        actions: React.PropTypes.object,
        notifications: React.PropTypes.object,
        useGroups: React.PropTypes.bool,
        useCardForSubGroups: React.PropTypes.bool,
        children: React.PropTypes.any,
        onChange: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin,
        DataSourceMixin
    ],

    _onSave(model) {
        if (!this.isLoading()) {
            this.props.actions.save(model);
        }
    },

    _onDelete() {
        if (!this.isLoading()) {
            this.props.actions.delete(this.props.source.get('data'));
        }
    },

    _onCancel() {
        if (!this.isLoading()) {
            this.props.actions.cancel();
        }
    },

    _onChange(currentValues, isChanged) {
        if (this.isLoading()) {
            return;
        }

        if (this.props.onChange) {
            this.props.onChange(currentValues, isChanged);
        }
    },

    render() {
        return (
            <Form
                title={this.props.title}
                loading={this.isLoading()}
                model={this.getData()}
                onSave={this._onSave}
                onDelete={this._onDelete}
                onCancel={this._onCancel}
                onChange={this._onChange}
                onNotification={this._onNotification}
                useGroups={this.props.useGroups}
                useCardForSubGroups={this.props.useCardForSubGroups}
            >
                {this.props.children}
            </Form>
        );
    }
});
