import React from 'react';
import isNil from 'lodash/isNil';
import capitalize from 'lodash/capitalize';
import MenuItem from 'material-ui/MenuItem';
import {
    FormsyToggle,
    FormsySelect,
    FormsyText
} from 'formsy-material-ui/lib';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import EVENTS from '../../../../../../domain/registry/peripherals/events';
import Form from '../../../../common/form/form';

const EVENT_OPTONS = EVENTS.toSeq().map((value, key) => {
    const itemKey = key;
    return (
        <MenuItem
            key={itemKey}
            value={value}
            primaryText={capitalize(itemKey)}
        />
    );
}).toArray();

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object,
        loading: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onCancel: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin
    ],

    getDefaultProps() {
        return {
            item: {}
        };
    },

    _isNew() {
        const id = this.props.item.id;
        return isNil(id) || id === 0;
    },

    render() {
        return (
            <Form
                title="Subscriber"
                onSave={this.props.onSave}
                onDelete={this.props.onDelete}
                onCancel={this.props.onCancel}
            >
                <FormsyText
                    name="name"
                    floatingLabelText="Name"
                    disabled={this.props.loading}
                    value={this.props.item.name}
                    fullWidth
                    required
                />
                <FormsySelect
                    name="event"
                    floatingLabelText="Event"
                    disabled={this.props.loading || !this._isNew()}
                    value={this.props.item.event}
                    fullWidth
                    required
                >
                    {EVENT_OPTONS}
                </FormsySelect>
                <FormsyToggle
                    className="form-control-checkbox"
                    name="enabled"
                    label="Enabled"
                    labelPosition="right"
                    disabled={this.props.loading}
                    value={this.props.item.enabled}
                    defaultToggled={false}
                />
            </Form>
        );
    }
});
