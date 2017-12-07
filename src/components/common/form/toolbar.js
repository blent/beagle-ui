/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle
} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
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

    getDefaultProps() {
        return {
            title: '',
            loading: false,
            submit: false,
            hideSave: false,
            hideDelete: false,
            hideCancel: false,
            disableSave: false,
            disableDelete: false,
            disableCancel: false
        };
    },

    _renderButtons() {
        const buttons = [];

        if (this.props.hideSave !== true) {
            const saveType = this.props.submit ? 'submit' : 'button';
            buttons.push(<RaisedButton
                key="save"
                label="Save"
                type={saveType}
                primary
                onClick={this.props.onSaveClick}
                disabled={this.props.loading || this.props.disableSave}
            />);
        }

        if (this.props.hideDelete !== true) {
            buttons.push(<RaisedButton
                key="delete"
                label="Delete"
                disabled={this.props.loading || this.props.disableDelete}
                onClick={this.props.onDeleteClick}
                secondary
            />);
        }

        if (this.props.hideCancel !== true) {
            buttons.push(<RaisedButton
                key="cancel"
                label="Cancel"
                disabled={this.props.loading || this.props.disableCancel}
                onClick={this.props.onCancelClick}
            />);
        }

        return buttons;
    },

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text={this.props.title} />
                </ToolbarGroup>
                <ToolbarGroup>
                    {this._renderButtons()}
                </ToolbarGroup>
            </Toolbar>
        );
    }
});
