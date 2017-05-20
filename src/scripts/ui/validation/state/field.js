import { Record } from 'immutable';

const DEFAULT_STATE = {
    isValid: true,
    message: null
};

const ValidationFieldState = Record(DEFAULT_STATE);

export default function create(values = DEFAULT_STATE) {
    return new ValidationFieldState({
        isValid: values.isValid == null ? DEFAULT_STATE.isValid : values.isValid,
        message: values.message
    });
}
