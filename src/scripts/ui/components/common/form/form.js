/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Card
} from 'material-ui/Card';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import cn from 'classnames';
import merge from 'lodash/merge';
import Loader from '../../common/loader/loader';
import DataSourceMixin from '../../mixins/data-source-mixin';

const PATH_ID = ['data', 'id'];

function isModelNew(model) {
    if (!model) {
        return true;
    }

    return !model.getIn(PATH_ID) > 0;
}

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        source: React.PropTypes.object,
        actions: React.PropTypes.object,
        notifications: React.PropTypes.object,
        children: React.PropTypes.any,
        onChange: React.PropTypes.func
    },

    mixins: [
        DataSourceMixin
    ],

    getInitialState() {
        const model = this.getData();

        return {
            canSubmit: !this._isModelNew(),
            isDirty: this._isModelNew(),
            model: model ? model.toJS() : {}
        };
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.source.data !== nextProps.source.data) {
            const model = nextProps.source.get('data');

            this.setState({
                isDirty: isModelNew(nextProps.source),
                canSubmit: !isModelNew(nextProps.source),
                model: model ? model.toJS() : {}
            });
        }
    },

    _onDeleteClick() {
        if (!this.isLoading()) {
            this.props.actions.delete(this.props.source.get('data'));
        }
    },

    _onCancelClick() {
        if (!this.isLoading()) {
            this.props.actions.cancel();
        }
    },

    _onValidSubmit(model) {
        if (!this.isLoading()) {
            if (this._isModelNew()) {
                this.props.actions.save(model);
            } else {
                this.props.actions.save(merge({
                    id: this.props.source.getIn(PATH_ID)
                }, model));
            }
        }
    },

    _onInvalidSubmit(errors) {
        if (!this.isLoading()) {
            this.props.notifications.error('Form is invalid', errors);
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
        return isModelNew(this.props.source);
    },

    _isDirty() {
        return this.state.isDirty;
    },

    _renderButtons() {
        const buttons = [
            <RaisedButton
                key="save"
                label="Save"
                type="submit"
                primary
                disabled={this.isLoading() || !this._isFormValid() || !this._isDirty()}
            />
        ];

        if (!this._isModelNew()) {
            buttons.push(
                <RaisedButton
                    key="delete"
                    label="Delete"
                    disabled={this.isLoading()}
                    onClick={this._onDeleteClick}
                    secondary
                />
            );
        }

        buttons.push(
            <RaisedButton
                key="cancel"
                label="Cancel"
                disabled={this.isLoading()}
                onClick={this._onCancelClick}
            />
        );

        return buttons;
    },

    _renderLoader() {
        if (this.isLoading()) {
            return <Loader type="linear" />;
        }

        return null;
    },

    render() {
        const cardClassNames = cn({
            card: true,
            'card-loading': this.isLoading()
        });
        return (
            <Card className={cardClassNames}>
                <Formsy.Form
                    className="form"
                    onValid={this._onValid}
                    onInvalid={this._onInvalid}
                    onValidSubmit={this._onValidSubmit}
                    onInvalidSubmit={this._onInvalidSubmit}
                    onChange={this._onChange}
                >
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.props.title} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            {this._renderButtons()}
                        </ToolbarGroup>
                    </Toolbar>
                    {this._renderLoader()}
                    <div
                        className={cardClassNames}
                    >
                        {this.props.children}
                    </div>
                </Formsy.Form>
            </Card>
        );
    }
});
