/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Card
} from 'material-ui/Card';
import Formsy from 'formsy-react';
import cn from 'classnames';
import merge from 'lodash/merge';
import isNumber from 'lodash/isNumber';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import map from 'lodash/map';
import FormCard from './card';
import styles from './form.module.css';

function isModelNew(model) {
    if (!model) {
        return true;
    }

    return !isNumber(model.id) || model.id <= 0;
}

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        model: React.PropTypes.object,
        loading: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onNotification: React.PropTypes.func,
        useGroups: React.PropTypes.bool,
        useCardForSubGroups: React.PropTypes.bool,
        children: React.PropTypes.any
    },

    mixins: [
        PureRenderMixin
    ],

    getInitialState() {
        return {
            canSubmit: !this._isModelNew(),
            isDirty: this._isModelNew(),
            model: this.props.model || {}
        };
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.model !== nextProps.model) {
            this.setState({
                isDirty: isModelNew(nextProps.model),
                canSubmit: !isModelNew(nextProps.model),
                model: nextProps.model || {}
            });
        }
    },

    _isLoading() {
        return this.props.loading === true;
    },

    _onDeleteClick() {
        if (!this.props.onDelete) {
            return;
        }

        if (!this._isLoading()) {
            this.props.onDelete(this.props.model);
        }
    },

    _onCancelClick() {
        if (!this.props.onCancel) {
            return;
        }

        if (!this._isLoading()) {
            this.props.onCancel();
        }
    },

    _onValidSubmit(model) {
        if (!this.props.onSave) {
            return;
        }

        if (!this._isLoading()) {
            if (this._isModelNew()) {
                this.props.onSave(model);
            } else {
                this.props.onSave(merge({
                    id: this.props.model.id
                }, model));
            }
        }
    },

    _onInvalidSubmit(errors) {
        if (!this.props.onNotification) {
            return;
        }

        if (!this._isLoading()) {
            this.props.onNotification('error', 'Form is invalid', errors);
        }
    },

    _onValid() {
        this.setState({
            canSubmit: true
        });
    },

    _onInvalid() {
        this.setState({
            canSubmit: false
        });
    },

    _onChange(currentValues, isChanged) {
        this.setState({
            isDirty: isChanged
        });

        if (this.props.onChange) {
            this.props.onChange(currentValues, isChanged);
        }
    },

    _isFormValid() {
        return this.state.canSubmit;
    },

    _isModelNew() {
        return isModelNew(this.props.model);
    },

    _isDirty() {
        return this.state.isDirty;
    },

    _renderMainCard(children) {
        return (
            <FormCard
                key="main"
                title={this.props.title}
                loading={this._isLoading()}
                hideDelete={this._isModelNew()}
                disableSave={!this._isFormValid() || !this._isDirty()}
                onDeleteClick={this._onDeleteClick}
                onCancelClick={this._onCancelClick}
                submit
            >
                {children}
            </FormCard>
        );
    },

    _renderAdditionalCard(children, className, index) {
        return (
            <Card
                key={`additional-${index}`}
                className={className}
            >
                <div
                    className={className}
                >
                    {children}
                </div>
            </Card>
        );
    },

    _renderChildren() {
        const cardClassNames = cn({
            card: true,
            [styles.card]: true,
            'card-loading': this._isLoading()
        });

        if (!this.props.useGroups) {
            return this._renderMainCard(this.props.children);
        }

        const groups = [];

        React.Children.forEach(this.props.children, (child) => {
            if (!child) {
                return;
            }

            let groupName = parseFloat(child.props.group || '1') - 1;

            if (groupName < 0) {
                groupName = 0;
            }

            let group = groups[groupName];

            if (!group) {
                group = [];
                groups.push(group);
            }

            group.push(child);
        });

        return map(groups, (group, index) => {
            if (index === 0) {
                return this._renderMainCard(group, cardClassNames);
            }

            if (!this.props.useCardForSubGroups) {
                return (
                    <div
                        key={`group_${index}`}
                    >
                        {group}
                    </div>
                );
            }

            return this._renderAdditionalCard(group, cardClassNames, index);
        });
    },

    render() {
        return (
            <Formsy.Form
                className="form"
                onValid={this._onValid}
                onInvalid={this._onInvalid}
                onValidSubmit={this._onValidSubmit}
                onInvalidSubmit={this._onInvalidSubmit}
                onChange={this._onChange}
            >
                {this._renderChildren()}
            </Formsy.Form>
        );
    }
});
