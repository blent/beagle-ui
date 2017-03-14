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
import cn from 'classnames';

const PATH_ID = ['data', 'id'];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    getInitialState() {
        return {
            data: this.props.source.get('data').toJS()
        };
    },

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    _isPeripheralNew() {
        return this.props.source.getIn(PATH_ID) === 0;
    },

    _renderButtons() {
        const buttons = [
            <RaisedButton
                key="save"
                label="Save"
                primary
                disabled={this._isLoading()}
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

    _onCancelClick() {
        if (!this._isLoading()) {
            this.props.actions.cancel();
        }
    },

    render() {
        const cardClassNames = cn({
            card: true,
            'card-loading': this._isLoading()
        });
        return (
            <Card className={cardClassNames}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Registered peripherals" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {this._renderButtons()}
                    </ToolbarGroup>
                </Toolbar>
            </Card>
        );
    }
});
