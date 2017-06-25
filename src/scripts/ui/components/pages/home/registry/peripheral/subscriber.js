import React from 'react';
import isNil from 'lodash/isNil';
import capitalize from 'lodash/capitalize';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import merge from 'lodash/merge';
import get from 'lodash/get';
import ValidationState from '../../../../../validation/state/state';
import validationStateRunner from '../../../../../validation/runner';
import validationStateFieldRunner from '../../../../../validation/field-runner';
import EVENTS from '../../../../../../domain/registry/peripherals/events';
import FormCard from '../../../../common/form/card';
import AutoComplete from '../../../../common/autocomplete/container';

const PATH_VALIDATION_NAME = ['fields', 'name'];
const PATH_VALIDATION_NAME_MESSAGE = PATH_VALIDATION_NAME.concat(['message']);

const PATH_VALIDATION_EVENT = ['fields', 'event'];
const PATH_VALIDATION_EVENT_MESSAGE = PATH_VALIDATION_EVENT.concat(['message']);

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

const ENDPOINT_DATA_SOURCE_CONFIG = { text: 'name', value: 'id' };

function isNewItem(item) {
    if (item == null) {
        return true;
    }

    const id = item.id;
    return isNil(id) || id === 0;
}

function areAllValid(validation) {
    return validation.fields.some((field) => {
        return field.get('isValid') === false;
    }) === false;
}

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object,
        endpoints: React.PropTypes.object,
        endpointsActions: React.PropTypes.object,
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
            loading: false,
            item: {},
            endpoints: []
        };
    },

    getInitialState() {
        return {
            item: this.props.item.toJS(),
            isDirty: false,
            validation: ValidationState({
                isValid: true,
                fields: {
                    name: {
                        isValid: true,
                        message: null,
                        rules: [
                            'required',
                            'notEmpty'
                        ]
                    },
                    event: {
                        isValid: true,
                        message: null,
                        rules: [
                            'required'
                        ]
                    },
                    endpoint: {
                        isValid: true,
                        message: null,
                        rules: [
                            'required'
                        ]
                    }
                }
            })
        };
    },

    componentWillMount() {
        // run initial validation for not saved item

        if (this._isNew() === true) {
            const updated = validationStateRunner(this.state.validation, this.state.item);

            if (updated !== this.state.validation) {
                this.setState({
                    validation: updated
                });
            }
        }
    },

    _isNew() {
        return isNewItem(this.state.item);
    },

    _isDirty() {
        return this.state.isDirty;
    },

    _isFormValid() {
        return this.state.validation.isValid;
    },

    _onNameChange(evt, value) {
        this._setItemValue('name', value);
    },

    _onEventChange(evt, index, value) {
        this._setItemValue('event', value);
    },

    _onEnabledToggle(evt, value) {
        this._setItemValue('enabled', value);
    },

    _onEndpointSelect(chosenEndpoint) {
        this._setItemValue('endpoint', chosenEndpoint);
    },

    _setItemValue(key, value) {
        const values = merge({}, this.state.item, {
            [key]: value
        });
        let validation = this.state.validation;
        const before = validation.get('fields').get(key);


        if (before != null) {
            const after = validationStateFieldRunner(before, values);

            if (before !== after) {
                validation = validation.withMutations((input) => {
                    const state = input;
                    state.isValid = false;
                    state.fields = state.fields.set(key, after);
                });

                if (before.isValid === false && after.isValid === true) {
                    validation = validation.set('isValid', areAllValid(validation));
                }
            }
        }

        this.setState({
            isDirty: true,
            item: values,
            validation
        });
    },

    _onSave() {
        if (this.state.validation.isValid === true) {
            this.props.onSave(this.state.item);
        }
    },

    render() {
        return (
            <FormCard
                title="Subscriber"
                loading={this.props.loading}
                hideDelete={this._isNew()}
                disableSave={!this._isFormValid() || !this._isDirty()}
                onSaveClick={this._onSave}
                onDeleteClick={this.props.onDelete}
                onCancelClick={this.props.onCancel}
            >
                <TextField
                    name="name"
                    floatingLabelText="Name"
                    disabled={this.props.loading}
                    value={this.state.item.name || ''}
                    errorText={this.state.validation.getIn(PATH_VALIDATION_NAME_MESSAGE)}
                    onChange={this._onNameChange}
                    fullWidth
                />
                <SelectField
                    name="event"
                    floatingLabelText="Event"
                    disabled={this.props.loading || !this._isNew()}
                    value={this.state.item.event}
                    errorText={this.state.validation.getIn(PATH_VALIDATION_EVENT_MESSAGE)}
                    onChange={this._onEventChange}
                    fullWidth
                >
                    {EVENT_OPTONS}
                </SelectField>
                <AutoComplete
                    name="endpoint"
                    label="Endpoint"
                    disabled={this.props.loading || !this._isNew()}
                    searchText={get(this.state.item, 'endpoint.name')}
                    searchParam="name"
                    shape={ENDPOINT_DATA_SOURCE_CONFIG}
                    source={this.props.endpoints}
                    actions={this.props.endpointsActions}
                    onSelect={this._onEndpointSelect}
                    fullWidth
                />
                <Toggle
                    className="form-control-checkbox"
                    name="enabled"
                    label="Enabled"
                    labelPosition="right"
                    disabled={this.props.loading}
                    value={this.state.item.enabled}
                    defaultToggled={false}
                    onToggle={this._onEnabledToggle}
                />
            </FormCard>
        );
    }
});
