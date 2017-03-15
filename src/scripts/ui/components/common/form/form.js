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
import DataSourceMixin from '../../mixins/data-source-mixin';

const PATH_ID = ['data', 'id'];

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        source: React.PropTypes.object,
        actions: React.PropTypes.object,
        children: React.PropTypes.any
    },

    mixins: [
        DataSourceMixin
    ],

    getInitialState() {
        const model = this.getData();

        return {
            canSubmit: !this._isModelNew(),
            model: model ? model.toJS() : {}
        };
    },

    _onCancelClick() {
        if (!this.isLoading()) {
            this.props.actions.cancel();
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

    _isFormValid() {
        return this.state.canSubmit;
    },

    _isModelNew() {
        return !this.props.source.getIn(PATH_ID) > 0;
    },

    _renderButtons() {
        const buttons = [
            <RaisedButton
                key="save"
                label="Save"
                primary
                disabled={this.isLoading() || !this._isFormValid()}
            />
        ];

        if (!this._isModelNew()) {
            buttons.push(
                <RaisedButton
                    key="delete"
                    label="Delete"
                    disabled={this.isLoading()}
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
                >
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.props.title} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            {this._renderButtons()}
                        </ToolbarGroup>
                    </Toolbar>

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
