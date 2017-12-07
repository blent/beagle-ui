/* eslint-disable no-prototype-builtins, react/sort-comp, no-lonely-if, max-len, react/no-will-update-set-state */
import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import toNumber from 'lodash/toNumber';
import isNaN from 'lodash/isNaN';

function setMuiComponentAndMaybeFocus(c) {
    if (c === this.muiComponent) return;

    this.muiComponent = c;

    if (c && isFunction(c.focus)) {
        this.focus = () => c.focus();
    } else if (this.hasOwnProperty('focus')) {
        delete this.focus;
    }
}

function convertValue(value) {
    const result = toNumber(value);

    if (isNaN(result)) {
        return 0;
    }

    return result;
}

const FormsyText = React.createClass({
    propTypes: {
        defaultValue: React.PropTypes.any,
        name: React.PropTypes.string.isRequired,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        requiredError: React.PropTypes.string,
        underlineFocusStyle: React.PropTypes.object,
        underlineStyle: React.PropTypes.object,
        updateImmediately: React.PropTypes.bool,
        validationColor: React.PropTypes.string,
        validationError: React.PropTypes.string,
        validationErrors: React.PropTypes.object,
        validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        value: React.PropTypes.any,
    },

    mixins: [Formsy.Mixin],

    defaultProps: {
        underlineFocusStyle: {},
        underlineStyle: {},
    },

    getInitialState() {
        const value = this.controlledValue();
        return { value };
    },

    componentWillMount() {
        this.setValue(this.controlledValue());
    },

    componentWillReceiveProps(nextProps) {
        const isValueChanging = nextProps.value !== this.props.value;
        if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
            const value = this.controlledValue(nextProps);
            const isValid = this.isValidValue(value);

            if (isValueChanging || this.props.defaultValue === this.getValue()) {
                this.setState({ value, isValid });
                this.setValue(value);
            }
        }
    },

    componentWillUpdate(nextProps, nextState) {
        if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
      nextState._isPristine !== this.state._isPristine) { // eslint-disable-line no-underscore-dangle
            // Calling state here is valid, as it cannot cause infinite recursion.
            const value = this.controlledValue(nextProps);
            const isValid = this.isValidValue(value);
            this.setValue(value);
            this.setState({ value, isValid });
        }
    },

    controlledValue(props = this.props) {
        return convertValue(props.value || props.defaultValue) || 0;
    },

    validationColor(props = this.props) {
        return props.validationColor || '#4CAF50';
    },

    handleBlur(event) {
        this.setValue(convertValue(event.currentTarget.value));
        delete this.changeValue;
        if (this.props.onBlur) this.props.onBlur(event);
    },

    handleChange(event) {
        const value = convertValue(event.currentTarget.value);

        // Update the value (and so display any error) after a timeout.
        if (this.props.updateImmediately) {
            if (!this.changeValue) {
                this.changeValue = debounce(this.setValue, 400);
            }
            this.changeValue(value);
        } else {
            // If there was an error (on loss of focus) update on each keypress to resolve same.
            if (this.getErrorMessage() != null) {
                this.setValue(value);
            } else {
                // Only update on valid values, so as to not generate an error until focus is lost.
                if (this.isValidValue(value)) {
                    this.setValue(value);
                    // If it becomes invalid, and there isn't an error message, invalidate without error.
                }
            }
        }

        // Controlled component
        this.setState({
            value,
            isValid: this.isValidValue(value)
        });

        if (this.props.onChange) this.props.onChange(event, value);
    },

    handleKeyDown(event) {
        const value = convertValue(event.currentTarget.value);
        if (keycode(event) === 'enter') this.setValue(value);
        if (this.props.onKeyDown) this.props.onKeyDown(event, value);
    },

    setMuiComponentAndMaybeFocus,

    render() {
        const {
            defaultValue, // eslint-disable-line no-unused-vars
            requiredError,
            underlineFocusStyle,
            underlineStyle,
            updateImmediately, // eslint-disable-line no-unused-vars
            validations, // eslint-disable-line no-unused-vars
            validationError, // eslint-disable-line no-unused-vars
            validationErrors, // eslint-disable-line no-unused-vars
            value, // eslint-disable-line no-unused-vars
            ...rest
        } = this.props;

        const {
            isRequired, isPristine, isValid, isFormSubmitted
        } = this;
        const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
        const errorText = this.getErrorMessage() || isRequiredError;

        return (
            <TextField
                disabled={this.isFormDisabled()}
                {...rest}
                errorText={errorText}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                ref={this.setMuiComponentAndMaybeFocus}
                value={this.state.value}
                underlineStyle={this.state.isValid ? { color: this.validationColor() } : underlineStyle}
                underlineFocusStyle={this.state.isValid ? { color: this.validationColor() } : underlineFocusStyle}
            />
        );
    },
});

export default FormsyText;
