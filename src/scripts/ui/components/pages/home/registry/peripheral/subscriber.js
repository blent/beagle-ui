import React from 'react';
import isNil from 'lodash/isNil';
import capitalize from 'lodash/capitalize';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import merge from 'lodash/merge';
import trim from 'lodash/trim';
import ValidationState from '../../../../../validation/state/state';
import EVENTS from '../../../../../../domain/registry/peripherals/events';
import FormCard from '../../../../common/form/card';

const PATH_VALIDATION_NAME = ['fields', 'name'];
const PATH_VALIDATION_NAME_ISVALID = PATH_VALIDATION_NAME.concat(['isValid']);
const PATH_VALIDATION_NAME_MESSAGE = PATH_VALIDATION_NAME.concat(['message']);
const PATH_VALIDATION_EVENT = ['fields', 'event'];
const PATH_VALIDATION_EVENT_ISVALID = PATH_VALIDATION_EVENT.concat(['isValid']);
const PATH_VALIDATION_EVENT_MESSAGE = PATH_VALIDATION_EVENT.concat(['message']);
const VALIDATION_PATHS = {
    name: {
        isValid: PATH_VALIDATION_NAME_ISVALID,
        message: PATH_VALIDATION_NAME_MESSAGE
    },
    event: {
        isValid: PATH_VALIDATION_EVENT_ISVALID,
        message: PATH_VALIDATION_EVENT_MESSAGE
    }
};

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
            item: {}
        };
    },

    getInitialState() {
        const isNew = isNewItem(this.props.item);
        return {
            item: this.props.item,
            isDirty: false,
            validation: ValidationState({
                isValid: !isNew,
                fields: {
                    name: {
                        isValid: !isNew,
                        message: null
                    },
                    event: {
                        isValid: !isNew,
                        message: null
                    }
                }
            })
        };
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
        const validation = {
            isValid: trim(value) !== '',
            message: null
        };

        if (validation.isValid === false) {
            validation.message = 'Required';
        }

        this._setItemValue('name', value, validation);
    },

    _onEventChange(evt, index, value) {
        const validation = {
            isValid: trim(value) !== '',
            message: null
        };

        if (validation.isValid === false) {
            validation.message = 'Required';
        }

        this._setItemValue('event', value, validation);
    },

    _onEnabledToggle(evt, value) {
        this._setItemValue('enabled', value);
    },

    _setItemValue(key, value, fieldValidation) {
        let validation = this.state.validation;

        if (fieldValidation) {
            const isFieldValid = this.state.validation.getIn(VALIDATION_PATHS[key].isValid);

            if (fieldValidation.isValid !== isFieldValid) {
                validation = this.state.validation.withMutations((state) => {
                    const field = state.fields.get(key).merge(fieldValidation);
                    state.set('fields', state.fields.set(key, field));

                    const isFormValid = areAllValid(state);

                    if (isFormValid !== state.isValid) {
                        state.set('isValid', isFormValid);
                    }

                    return state;
                });
            }
        }

        this.setState({
            isDirty: true,
            item: merge({}, this.state.item, {
                [key]: value
            }),
            validation
        });
    },

    render() {
        return (
            <FormCard
                title="Subscriber"
                loading={this.props.loading}
                hideDelete={this._isNew()}
                disableSave={!this._isFormValid() || !this._isDirty()}
                onSaveClick={this.props.onSave}
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
                    required
                />
                <SelectField
                    name="event"
                    floatingLabelText="Event"
                    disabled={this.props.loading || !this._isNew()}
                    value={this.state.item.event}
                    errorText={this.state.validation.getIn(PATH_VALIDATION_EVENT_MESSAGE)}
                    onChange={this._onEventChange}
                    fullWidth
                    required
                >
                    {EVENT_OPTONS}
                </SelectField>
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
