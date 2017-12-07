import React from 'react';
import isNil from 'lodash/isNil';
import capitalize from 'lodash/capitalize';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List } from 'immutable';
import merge from 'lodash/merge';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import ValidationState from '../../../../../validation/state/state';
import {
    isStateValid as areAllValid,
    fieldRunner as validationStateFieldRunner,
    stateRunner as validationStateRunner
} from '../../../../../validation/runner';
import EVENTS from '../../../../../models/peripherals/events';
import FormCard from '../../../../common/form/card';
import AutoComplete from '../../../../common/autocomplete/container';

const PATH_VALIDATION_NAME = ['fields', 'name'];
const PATH_VALIDATION_NAME_MESSAGE = PATH_VALIDATION_NAME.concat(['message']);

const PATH_VALIDATION_EVENT = ['fields', 'event'];
const PATH_VALIDATION_EVENT_MESSAGE = PATH_VALIDATION_EVENT.concat(['message']);

const PATH_VALIDATION_ENDPOINT = ['fields', 'endpoint'];
const PATH_VALIDATION_ENDPOINT_MESSAGE = PATH_VALIDATION_ENDPOINT.concat(['message']);

const EVENT_OPTIONS_VALUES = EVENTS.toSeq().map(i => i).toArray();
const EVENT_OPTIONS_KEYS = EVENTS.toSeq().map((_, i) => i).toArray();
const EVENT_OPTIONS_REACT = EVENTS.toSeq().map((value, key) => {
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
const EMPTYNESS_TEST_FIELDS = List(['name', 'event', 'enabled']);

const VALIDATION_ERR_REQUIRED = 'Required';
const VALIDATION_ERR_NOT_EMPTY_STR = 'Can not be empty';
const VALIDATON_ERR_ONE_OF_EVENT = `Must be one of "${EVENT_OPTIONS_KEYS.join(',')}"`;

function isItemNew(item) {
    if (item == null) {
        return true;
    }

    const { id } = item;
    return isNil(id) || id === 0;
}

function isItemEmpty(item) {
    return EMPTYNESS_TEST_FIELDS.every(i => isUndefined(item.get(i)));
}

const DEFAULT_VALIDATION_STATE = ValidationState({
    fields: {
        name: {
            rules: [
                {
                    name: 'required',
                    message: VALIDATION_ERR_REQUIRED
                },
                {
                    name: 'notEmptyString',
                    message: VALIDATION_ERR_NOT_EMPTY_STR
                }
            ]
        },
        event: {
            rules: [
                {
                    name: 'required',
                    message: VALIDATION_ERR_REQUIRED
                },
                {
                    name: 'oneOf',
                    message: VALIDATON_ERR_ONE_OF_EVENT,
                    options: EVENT_OPTIONS_VALUES

                }
            ]
        },
        endpoint: {
            rules: [
                {
                    name(values, value) {
                        return isItemNew(value) === false;
                    },
                    message: VALIDATION_ERR_REQUIRED
                }
            ]
        }
    }
});

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
            isNew: isItemNew(this.props.item),
            isDirty: false,
            validation: DEFAULT_VALIDATION_STATE
        };
    },

    componentWillMount() {
        // It's new (not save) and not previously created
        if (this.state.isNew === true && isItemEmpty(this.props.item) === true) {
            this.setState({
                validation: validationStateRunner(this.state.validation, this.state.item, false)
            });
        }
    },

    _isFormValid() {
        return this.state.validation.isValid;
    },

    _onNameChange(evt, value) {
        this._setFieldValue('name', value);
    },

    _onNameBlur() {
        this._setFieldValidation('name');
    },

    _onEventChange(evt, index, value) {
        this._setFieldValue('event', value, true);
    },

    _onEnabledToggle(evt, value) {
        this._setFieldValue('enabled', value, true);
    },

    _onEndpointSelect(chosenEndpoint) {
        this._setFieldValue('endpoint', chosenEndpoint, true);
    },

    _validateField(key, values) {
        let { validation } = this.state;
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

        return validation;
    },

    _setFieldValidation(key) {
        const validation = this._validateField(key, this.state.item);

        if (this.state.validation !== validation) {
            this.setState({ validation });
        }
    },

    _setFieldValue(key, value, validate = false) {
        const values = merge({}, this.state.item, {
            [key]: value
        });

        this.setState({
            isDirty: true,
            item: values,
            validation: validate === true ?
                this._validateField(key, values) :
                this.state.validation
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
                hideDelete={this.state.isNew}
                disableSave={this.state.validation.isValid === false || this.state.isDirty === false}
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
                    onBlur={this._onNameBlur}
                    fullWidth
                />
                <SelectField
                    name="event"
                    floatingLabelText="Event"
                    disabled={this.props.loading || this.state.isNew === false}
                    value={this.state.item.event}
                    errorText={this.state.validation.getIn(PATH_VALIDATION_EVENT_MESSAGE)}
                    onChange={this._onEventChange}
                    fullWidth
                >
                    {EVENT_OPTIONS_REACT}
                </SelectField>
                <AutoComplete
                    name="endpoint"
                    label="Endpoint"
                    disabled={this.props.loading || this.state.isNew === false}
                    searchText={get(this.state.item, 'endpoint.name')}
                    errorText={this.state.validation.getIn(PATH_VALIDATION_ENDPOINT_MESSAGE)}
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
                    defaultToggled={this.state.item.enabled}
                    onToggle={this._onEnabledToggle}
                />
            </FormCard>
        );
    }
});
