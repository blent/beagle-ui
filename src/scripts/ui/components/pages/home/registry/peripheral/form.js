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
import MenuItem from 'material-ui/MenuItem';
import Formsy from 'formsy-react';
import {
    FormsyCheckbox,
    FormsySelect,
    FormsyText
} from 'formsy-material-ui/lib';
import cn from 'classnames';
import kinds from '../../../../../../domain/registry/peripherals/kind';

const PATH_ID = ['data', 'id'];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    getInitialState() {
        const model = this.props.source.get('data');

        return {
            canSubmit: !this._isPeripheralNew(),
            model: model ? model.toJS() : {}
        };
    },

    _onCancelClick() {
        if (!this._isLoading()) {
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

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    _isPeripheralNew() {
        return !this.props.source.getIn(PATH_ID) > 0;
    },

    _renderButtons() {
        const buttons = [
            <RaisedButton
                key="save"
                label="Save"
                primary
                disabled={this._isLoading() || !this._isFormValid()}
            />
        ];

        if (!this._isPeripheralNew()) {
            buttons.push(
                <RaisedButton
                    key="delete"
                    label="Delete"
                    disabled={this._isLoading()}
                    secondary
                />
            );
        }

        buttons.push(
            <RaisedButton
                key="cancel"
                label="Cancel"
                disabled={this._isLoading()}
                onClick={this._onCancelClick}
            />
        );

        return buttons;
    },

    _renderKindDropdown() {
        return (
            <FormsySelect
                name="kind"
                floatingLabelText="Peripheral kind"
                disabled={this._isLoading()}
                fullWidth
                required
            >
                {kinds.toSeq().map((value, key) => {
                    const itemKey = key;
                    return (
                        <MenuItem
                            key={itemKey}
                            value={value}
                            primaryText={value}
                        />
                    );
                }).toArray()}
            </FormsySelect>
        );
    },

    render() {
        const cardClassNames = cn({
            card: true,
            'card-loading': this._isLoading()
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
                            <ToolbarTitle text="Registered peripherals" />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            {this._renderButtons()}
                        </ToolbarGroup>
                    </Toolbar>

                    <div
                        className={cardClassNames}
                    >
                        {this._renderKindDropdown()}
                        <FormsyText
                            name="name"
                            floatingLabelText="Peripheral name"
                            fullWidth
                            required
                        />
                        <FormsyCheckbox
                            className="form-control-checkbox"
                            name="enabled"
                            label="Enabled"
                        />
                    </div>
                </Formsy.Form>
            </Card>
        );
    }
});
